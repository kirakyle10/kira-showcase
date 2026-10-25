import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { menuItems, menuNameFor, mockOrderQueue } from '../../data/menuItems';

const categories = [
  { id: 'all', key: 'booking.cat_all' },
  { id: 'hot', key: 'booking.cat_hot' },
  { id: 'cold', key: 'booking.cat_cold' },
  { id: 'food', key: 'booking.cat_food' },
  { id: 'dessert', key: 'booking.cat_dessert' },
];

export default function MenuOrder({ role }) {
  const { t, i18n } = useTranslation();
  const [cat, setCat] = useState('all');
  const [cart, setCart] = useState([]);
  const [queue, setQueue] = useState(mockOrderQueue);
  const [success, setSuccess] = useState(null);
  const lang = i18n.resolvedLanguage;

  const visible = useMemo(
    () => (cat === 'all' ? menuItems : menuItems.filter((m) => m.category === cat)),
    [cat]
  );

  const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0);

  const add = (item) =>
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { id: item.id, name: menuNameFor(item, lang), price: item.price, qty: 1, emoji: item.emoji }];
    });

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const placeOrder = () => {
    if (!cart.length) return;
    const id = Math.floor(1000 + Math.random() * 9000);
    setSuccess(id);
    setCart([]);
    setTimeout(() => setSuccess(null), 3500);
  };

  const toggleReady = (orderId) =>
    setQueue((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: o.status === 'ready' ? 'preparing' : 'ready' } : o
      )
    );

  const queueBadge = (status) => {
    if (status === 'pending') return <Badge variant="warn">{t('booking.pending')}</Badge>;
    if (status === 'preparing') return <Badge variant="accent">{t('booking.preparing')}</Badge>;
    return <Badge variant="success">{t('booking.ready')}</Badge>;
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <div className="glass-card p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                cat === c.id
                  ? 'bg-kira-accent text-white'
                  : 'border border-kira-border bg-kira-surface/70 text-kira-muted hover:text-kira-text'
              }`}
            >
              {t(c.key)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((it) => (
            <div
              key={it.id}
              className="flex flex-col items-start gap-1 rounded-xl border border-kira-border/60 bg-kira-bg/40 p-3 transition-transform hover:-translate-y-0.5"
            >
              <div className="text-3xl">{it.emoji}</div>
              <div className="w-full truncate text-sm font-medium">{menuNameFor(it, lang)}</div>
              <div className="text-xs text-kira-muted">{it.price} TJS</div>
              <Button size="sm" onClick={() => add(it)} className="mt-1 w-full">
                <Plus size={12} />
                {t('booking.add_order')}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="glass-card flex flex-col p-5">
          <h4 className="font-display text-base font-semibold">{t('booking.menu_title')}</h4>
          {cart.length === 0 ? (
            <div className="py-8 text-center text-sm text-kira-muted">—</div>
          ) : (
            <ul className="mt-3 divide-y divide-kira-border/60">
              {cart.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between gap-2 py-2 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-lg">{it.emoji}</span>
                    <span className="truncate">{it.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changeQty(it.id, -1)}
                      className="rounded-md border border-kira-border p-1 hover:bg-kira-border/50"
                      aria-label="Decrement"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center font-semibold">{it.qty}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(it.id, 1)}
                      className="rounded-md border border-kira-border p-1 hover:bg-kira-border/50"
                      aria-label="Increment"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 border-t border-kira-border/60 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-kira-muted">{t('booking.order_total')}</span>
              <span className="font-display text-xl font-bold text-kira-accent2">
                {total.toFixed(0)} TJS
              </span>
            </div>
            <Button
              onClick={placeOrder}
              variant="success"
              className="mt-3 w-full"
              disabled={!cart.length}
            >
              {t('booking.place_order')}
            </Button>
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 rounded-xl border border-kira-accent2/50 bg-kira-accent2/10 p-3 text-sm text-kira-accent2"
                >
                  ✅ {t('booking.order_sent', { id: success })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {role === 'admin' && (
          <div className="glass-card p-5">
            <h4 className="mb-3 font-display text-base font-semibold">{t('booking.queue')}</h4>
            <ul className="space-y-2">
              {queue.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-kira-border/60 bg-kira-bg/30 p-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <div className="font-semibold">#{o.id}</div>
                    <div className="truncate text-xs text-kira-muted">
                      {o.items.join(' · ')}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {queueBadge(o.status)}
                    <button
                      type="button"
                      onClick={() => toggleReady(o.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-kira-border px-2 py-1 text-xs hover:bg-kira-border/40"
                    >
                      <Check size={12} />
                      {t('booking.mark_ready')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
