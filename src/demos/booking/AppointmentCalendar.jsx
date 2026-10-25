import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import NotificationSim from './NotificationSim';
import { buildWeekSlots, dayList, labelForDay } from '../../data/appointments';

export default function AppointmentCalendar({ role }) {
  const { t, i18n } = useTranslation();
  const initial = useMemo(() => buildWeekSlots(), []);
  const [slots, setSlots] = useState(initial);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', service: 'haircut' });
  const [recent, setRecent] = useState(null);
  const lang = i18n.resolvedLanguage;

  const times = useMemo(
    () => Array.from(new Set(slots.map((s) => s.time))),
    [slots]
  );

  const slotFor = (day, time) => slots.find((s) => s.day === day && s.time === time);

  const openBook = (slot) => {
    setSelected(slot);
    setForm({ name: '', phone: '', service: 'haircut' });
  };

  const confirm = () => {
    if (!selected || !form.name.trim()) return;
    setSlots((prev) =>
      prev.map((s) =>
        s.id === selected.id ? { ...s, booked: true, client: form.name } : s
      )
    );
    setRecent({ name: form.name, time: selected.time });
    setSelected(null);
  };

  const cancelBooking = (slot) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, booked: false, client: null } : s))
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-kira-border/30 text-kira-muted">
                <th className="sticky left-0 bg-kira-border/30 px-2 py-2 text-left">⏰</th>
                {dayList.map((d) => (
                  <th key={d} className="px-2 py-2 text-center">
                    {labelForDay(d, lang)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-kira-border/60">
              {times.map((time) => (
                <tr key={time}>
                  <td className="sticky left-0 bg-kira-bg/80 px-2 py-1.5 font-mono text-xs text-kira-muted">
                    {time}
                  </td>
                  {dayList.map((d) => {
                    const slot = slotFor(d, time);
                    if (!slot) return <td key={d} className="px-1 py-1" />;
                    if (slot.booked) {
                      return (
                        <td key={d} className="px-1 py-1">
                          <div
                            className={`rounded-md border border-kira-border/70 bg-kira-border/30 px-1.5 py-1 text-[10px] text-kira-muted ${
                              role === 'admin' ? 'relative group' : ''
                            }`}
                            title={role === 'admin' ? slot.client : t('booking.booked')}
                          >
                            {role === 'admin'
                              ? slot.client?.split(' ')[0]
                              : t('booking.booked')}
                            {role === 'admin' && (
                              <button
                                type="button"
                                onClick={() => cancelBooking(slot)}
                                className="absolute inset-0 hidden items-center justify-center rounded-md bg-kira-warn/70 text-[10px] font-semibold text-white group-hover:flex"
                              >
                                {t('booking.cancel')}
                              </button>
                            )}
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td key={d} className="px-1 py-1">
                        <button
                          type="button"
                          onClick={() => openBook(slot)}
                          className="w-full rounded-md border border-kira-accent2/40 bg-kira-accent2/10 px-1.5 py-1 text-[10px] font-medium text-kira-accent2 hover:bg-kira-accent2/20"
                        >
                          +
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <AnimatePresence>
          {recent && (
            <NotificationSim booking={recent} onDismiss={() => setRecent(null)} />
          )}
        </AnimatePresence>
        {!recent && (
          <div className="glass-card p-5 text-sm text-kira-muted">
            {t('booking.select_slot')}
          </div>
        )}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${labelForDay(selected.day, lang)} · ${selected.time}` : ''}
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelected(null)}>
              {t('booking.cancel')}
            </Button>
            <Button onClick={confirm} disabled={!form.name.trim()}>
              {t('booking.confirm')}
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs text-kira-muted">{t('booking.your_name')}</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-kira-border bg-kira-bg/60 px-3 py-2 text-base focus:border-kira-accent focus:outline-none"
              autoFocus
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-kira-muted">{t('booking.phone')}</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+992 …"
              className="w-full rounded-xl border border-kira-border bg-kira-bg/60 px-3 py-2 text-base focus:border-kira-accent focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-kira-muted">{t('booking.service')}</span>
            <select
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              className="w-full rounded-xl border border-kira-border bg-kira-bg/60 px-3 py-2 text-base focus:border-kira-accent focus:outline-none"
            >
              <option value="haircut">{t('booking.service_haircut')}</option>
              <option value="consult">{t('booking.service_consult')}</option>
              <option value="massage">{t('booking.service_massage')}</option>
              <option value="table">{t('booking.service_table')}</option>
              <option value="delivery">{t('booking.service_delivery')}</option>
            </select>
          </label>
        </div>
      </Modal>
    </div>
  );
}
