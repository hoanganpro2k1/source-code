import { promises as fs } from "fs";
import path from "path";

// Chưa có Database thật (Prisma/Postgres) trong dự án này, tạm lưu ra file JSON
// để trạng thái thanh toán sống sót qua restart/hot-reload của Next.js dev server.
const STORE_PATH = path.join(process.cwd(), ".data", "sepay-payments.json");

type PaidOrder = {
  transactionId: number;
  amount: number;
  content: string;
  paidAt: string;
};

type Store = {
  paidOrders: Record<string, PaidOrder>;
  processedTransactionIds: number[];
};

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Store;
  } catch {
    return { paidOrders: {}, processedTransactionIds: [] };
  }
}

async function writeStore(store: Store): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export async function isTransactionProcessed(
  transactionId: number,
): Promise<boolean> {
  const store = await readStore();
  return store.processedTransactionIds.includes(transactionId);
}

export async function markOrderPaid(
  orderId: string,
  payment: PaidOrder,
): Promise<void> {
  const store = await readStore();
  store.paidOrders[orderId] = payment;
  store.processedTransactionIds.push(payment.transactionId);
  await writeStore(store);
}

export async function isOrderPaid(orderId: string): Promise<boolean> {
  const store = await readStore();
  return Boolean(store.paidOrders[orderId]);
}
