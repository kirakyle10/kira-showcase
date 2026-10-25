import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, Plus } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { inventory as seed, nameFor } from '../../data/inventory';

export default function InventoryTable({ role }) {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState(seed);
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' });
  const [restockItem, setRestockItem] = useState(null);
  const [restockQty, setRestockQty] = useState('');
  const lang = i18n.resolvedLanguage;

  const lowCount = items.filter((i) => i.stock < i.lowStockThreshold).length;

  const sorted = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => {
      const av = sort.key === 'name' ? nameFor(a, lang) : a[sort.key];
      const bv = sort.key === 'name' ? nameFor(b, lang) : b[sort.key];
      if (av < bv) return sort.dir === 'asc' ? -1 : 1;
      if (av > bv) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [items, sort, lang]);

  const toggleSort = (key) =>
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
    }));

  const confirmRestock = () => {
    const n = parseInt(restockQty, 10);
    if (!restockItem || !Number.isFinite(n) || n <= 0) {
      setRestockItem(null);
      setRestockQty('');
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === restockItem.id ? { ...i, stock: i.stock + n } : i))
    );
    setRestockItem(null);
    setRestockQty('');
  };

  const Th = ({ k, children, right }) => (
    <th
      className={`cursor-pointer select-none px-3 py-2 ${right ? 'text-right' : 'text-left'}`}
      onClick={() => toggleSort(k)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown size={12} className="text-kira-muted" />
      </span>
    </th>
  );

  return (
    <div className="glass-card p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-kira-muted">
          <span className="font-semibold text-kira-text">{items.length}</span> {t('market.items_total')} ·{' '}
          <span className="font-semibold text-kira-warn">{lowCount}</span> {t('market.low_alerts')}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-kira-border/30 text-xs uppercase tracking-wider text-kira-muted">
            <tr>
              <Th k="name">{t('market.product')}</Th>
              <th className="px-3 py-2 text-left">Barcode</th>
              <Th k="stock">{t('market.stock')}</Th>
              <th className="px-3 py-2 text-left">{t('market.quantity')}</th>
              <Th k="price" right>{t('market.price')}</Th>
              <th className="px-3 py-2 text-right">{t('market.status')}</th>
              {role === 'admin' && <th className="px-3 py-2 text-right">—</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-kira-border/60">
            {sorted.map((it) => {
              const low = it.stock < it.lowStockThreshold;
              return (
                <tr key={it.id} className="hover:bg-kira-border/20">
                  <td className="px-3 py-2">
                    <span className="mr-2 text-lg">{it.emoji}</span>
                    {nameFor(it, lang)}
                  </td>
                  <td className="px-3 py-2 text-xs text-kira-muted">{it.barcode}</td>
                  <td className="px-3 py-2">{it.stock}</td>
                  <td className="px-3 py-2 text-xs text-kira-muted">{it.unit}</td>
                  <td className="px-3 py-2 text-right font-medium">{it.price} TJS</td>
                  <td className="px-3 py-2 text-right">
                    {low ? (
                      <Badge variant="warn">⚠ {t('market.low_stock')}</Badge>
                    ) : (
                      <Badge variant="success">{t('market.ok')}</Badge>
                    )}
                  </td>
                  {role === 'admin' && (
                    <td className="px-3 py-2 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setRestockItem(it);
                          setRestockQty('');
                        }}
                      >
                        <Plus size={12} />
                        {t('market.restock')}
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!restockItem}
        onClose={() => setRestockItem(null)}
        title={restockItem ? `${t('market.restock')} — ${nameFor(restockItem, lang)}` : ''}
        footer={
          <>
            <Button variant="ghost" onClick={() => setRestockItem(null)}>
              {t('booking.cancel')}
            </Button>
            <Button variant="primary" onClick={confirmRestock}>
              {t('common.confirm')}
            </Button>
          </>
        }
      >
        <label className="block">
          <span className="mb-1 block text-sm text-kira-muted">{t('market.restock_add')}</span>
          <input
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            className="w-full rounded-xl border border-kira-border bg-kira-bg/60 px-3 py-2 text-base focus:border-kira-accent focus:outline-none"
            autoFocus
          />
        </label>
      </Modal>
    </div>
  );
}
