# Work Order

## created_at & timezone (WIB)

- Form admin kirim datetime: `YYYY-MM-DD HH:mm:ss` (komponen `date-time-picker.tsx`)
- Backend: `utils/helpers/dayjs.ts` → `resolveWorkOrderCreatedAt()`
  - Datetime lengkap → simpan jam user (cap tidak boleh masa depan)
  - Date-only + hari ini → waktu sekarang
  - Date-only + backdate → start of day Jakarta
- Model safety: `WorkOrdersModel.$beforeInsert` resolve jika format date-only
- Display admin: `formatWorkOrderDateTime`, `formatWorkOrderDateTimeFull`, `toWorkOrderDateTimeInput`
- Legacy bug: `startOf('day').toISOString()` → UTC midnight → tampil 07:00 WIB
- Migration fix (hari ini saja): `20260810143000_fix-work-orders-created-at-time.ts`

## File kunci

| Area | Path |
|------|------|
| Create WO API | `apps/backend/src/api/work-order/work-order.service.ts` → `createWO` |
| Edit tanggal | `PATCH /work-order/order-date/:id` |
| Form register | `bengkel-admin/src/pages/service/add/index.tsx` |
| Edit di detail | `bengkel-admin/src/pages/service/queue/components/edit-order-date.tsx` |
| List antrian | `bengkel-admin/src/pages/service/queue/components/list-table.tsx` |

## Queue stats

Backend stats: `waiting`, `processing`, `ready`, `completed`, `cancelled`
UI cards di `queue/index.tsx` — 6 status (tanpa waiting_queue tab)

## Vehicle upsert saat create WO — 2026-08-24
- **Masalah:** `POST /work-order` 409 jika `plate_number` sudah ada — `VehiclesModel.upsertAndRelate` selalu `insert`.
- **Solusi:** Cari by `plate_number` dulu → patch jika ada, insert jika belum; `customer_vehicle` relate hanya jika belum ada (sama pola `customers.service.createFromImport`).
- **File:** `models/vehicles.model.ts` → `upsertAndRelate`

## Sparepart qty desimal — 2026-08-24
- **Masalah:** Joi `qty.min(1)` + `normalizeSparepartQty` tolak 0.5 (oli/liter).
- **Solusi:** Sparepart Joi `.positive()` (> 0); service tetap `min(1)`. `normalizeSparepartQty` validasi `qty <= 0`.
- **DB:** `work_order_items.qty` & `products.stock` sudah `decimal(18,2)` — migration `20260424091739`.
- **File:** `work-order.dto.ts`, `work-order.service.ts` → `normalizeSparepartQty`
