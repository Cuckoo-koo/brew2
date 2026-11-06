import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Coffee, MapPin } from 'lucide-react';
import { CAFE_DETAILS } from '../data/cafeData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '2026-11-06',
    time: '11:00',
    guests: '2 Guests',
    tableType: 'Window Booth',
  });
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#D9B382]/40 my-4 max-h-[90vh] flex flex-col">
        {/* Close Button with touch target */}
        <button
          onClick={handleReset}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/15 hover:bg-black/25 text-[#1E1E1E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
          aria-label="Close reservation modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Banner */}
        <div className="bg-[#6F4E37] px-6 py-6 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FFF8F0]/20 flex items-center justify-center">
            <Coffee className="w-5 h-5 text-[#D9B382]" aria-hidden="true" />
          </div>
          <div>
            <h3 id="reservation-modal-title" className="text-xl font-bold font-heading">
              Reserve a Table or Booth
            </h3>
            <p className="text-xs text-[#D9B382]">The Daily Brew · Chennai</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {confirmed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#FFF8F0] text-[#6F4E37] rounded-full flex items-center justify-center mx-auto border border-[#D9B382]/40">
                <CheckCircle className="w-8 h-8 text-[#6F4E37]" aria-hidden="true" />
              </div>
              <h4 className="text-2xl font-bold text-[#1E1E1E] font-heading">
                Table Reserved!
              </h4>
              <p className="text-sm text-[#1E1E1E]/70 max-w-xs mx-auto">
                We have saved a {formData.tableType} for {formData.guests} on {formData.date} at {formData.time}.
              </p>
              <div className="p-4 bg-[#FFF8F0] rounded-xl text-xs text-[#6F4E37] font-medium border border-[#D9B382]/30 text-left space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Chennai</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#5A3F2C] transition-colors"
              >
                Close & Return to Menu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="res-phone"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                  >
                    Estimated Time
                  </label>
                  <input
                    id="res-time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                  >
                    Party Size
                  </label>
                  <select
                    id="res-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
                  >
                    <option>1 Person (Quiet Work)</option>
                    <option>2 Guests</option>
                    <option>3 - 4 Guests</option>
                    <option>5+ Guests (Large Table)</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="res-seating"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1"
                  >
                    Seating Area
                  </label>
                  <select
                    id="res-seating"
                    value={formData.tableType}
                    onChange={(e) => setFormData({ ...formData, tableType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9B382]/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] bg-white"
                  >
                    <option>Window Booth</option>
                    <option>Main Dining Room</option>
                    <option>Outdoor Patio</option>
                    <option>Work Bench (Power Plugs)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6F4E37] hover:bg-[#5A3F2C] text-white font-semibold text-sm shadow-md transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37]"
              >
                <span>Confirm Reservation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
