"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DeliveryInfo, PaymentMethod } from "@/lib/types";

type CheckoutState = {
  delivery: DeliveryInfo;
  payment: PaymentMethod;
  changeFor: string;
  setDelivery: (delivery: Partial<DeliveryInfo>) => void;
  setPayment: (payment: PaymentMethod) => void;
  setChangeFor: (value: string) => void;
};

const emptyDelivery: DeliveryInfo = {
  name: "",
  phone: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  reference: "",
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      delivery: emptyDelivery,
      payment: "pix",
      changeFor: "",
      setDelivery: (delivery) =>
        set((state) => ({ delivery: { ...state.delivery, ...delivery } })),
      setPayment: (payment) => set({ payment }),
      setChangeFor: (changeFor) => set({ changeFor }),
    }),
    { name: "rei-do-acai-checkout" },
  ),
);
