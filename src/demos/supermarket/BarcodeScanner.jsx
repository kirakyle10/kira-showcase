import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Minus, X, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { inventory, nameFor } from '../../data/inventory';

export default function BarcodeScanner({ role }) {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const lang = i18n.resolvedLanguage;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inventory.slice(0, 6);
    return inventory.filter((it) =>
      [it.barcode, it.name, it.nameRu, it.nameTj].some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  const total = cart.reduce((acc, it) => acc + it.qty * it.price, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { id: item.id, name: nameFor(item, lang), price: item.price, qty: 1, emoji: item.emoji }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const voidLast = () => setCart((prev) => prev.slice(0, -1));

  const checkout = () => {
    if (!cart.length) return;
    setReceipt({
      number: Math.floor(1000 + Math.random() * 9000),
      total,
      time: new Date().toLocaleString(),
      items: cart,
    });
    setCart([]);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="glass-card p-5">
        <label className="relative block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-kira-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('market.scan_barcode')}
            className="w-full rounded-xl border border-kira-border bg-kira-bg/60 py-3 pl-10 pr-3 text-base text-kira-text placeholder:text-kira-muted focus:border-kira-accent focus:outline-none"
          />
        </label>

        <ul className="mt-4 divide-y divide-kira-border/60">
          {filtered.length === 0 && (
            <li className="py-6 text-center text-sm text-kira-muted">—</li>
          )}
          {filtered.map((it) => (
            <li
              key={it.id}
              className="flex items-center justify-between gap-3 py-2.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-2xl">{it.emoji}</span>
                <div className="min-w-0">
                  <div className="truncate font-medium">{nameFor(it, lang)}</div>
                  <div className="text-xs text-kira-muted">
                    {it.barcode} · {it.price} TJS / {it.unit}
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={() => addToCart(it)}>
                <Plus size={14} />
                {t('market.add_to_cart')}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <aside className="glass-card flex flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-display text-base font-semibold">{t('market.cart')}</h4>
          {role === 'admin' && cart.length > 0 && (
            <button
              type="button"
              onClick={voidLast}
              className="inline-flex items-center gap-1 rounded-md border border-kira-warn/40 bg-kira-warn/10 px-2 py-1 text-xs text-kira-warn hover:bg-kira-warn/20"
            >
              <Trash2 size={12} />
              {t('market.void_last')}
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-8 text-sm text-kira-muted">
            {t('market.empty_cart')}
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-kira-border/60">
            {cart.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-2 py-2 text-sm">
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
                  <span className="w-14 text-right font-semibold">{(it.qty * it.price).toFixed(0)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 border-t border-kira-border/60 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-kira-muted">{t('market.total')}</span>
            <span className="font-display text-2xl font-bold text-kira-accent2">
              {total.toFixed(0)} TJS
            </span>
          </div>
          <Button
            onClick={checkout}
            disabled={!cart.length}
            variant="success"
            className="mt-3 w-full"
            size="lg"
          >
            {t('market.checkout')}
          </Button>
        </div>
      </aside>

      <Modal
        open={!!receipt}
        onClose={() => setReceipt(null)}
        title={`✅ ${t('market.sale_complete')}`}
      >
        {receipt && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-kira-muted">{t('market.receipt')}</span>
              <span className="font-semibold">#{receipt.number}</span>
            </div>
            <ul className="divide-y divide-kira-border/60 rounded-xl border border-kira-border/60">
              {receipt.items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between px-3 py-2"
                >
                  <span>
                    {it.emoji} {it.name} × {it.qty}
                  </span>
                  <span>{(it.price * it.qty).toFixed(0)} TJS</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>{t('market.total')}</span>
              <span className="text-kira-accent2">{receipt.total.toFixed(0)} TJS</span>
            </div>
            <div className="text-xs text-kira-muted">{receipt.time}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}
