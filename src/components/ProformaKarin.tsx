import { useMemo, useState } from 'react'

type Item = {
  cantidad: string
  detalle: string
  precio: string
}

const EMPTY_ITEM: Item = {
  cantidad: '',
  detalle: '',
  precio: '',
}

const ROWS = 20

export default function ProformaKarins() {
  const [mes, setMes] = useState('')
  const [anio, setAnio] = useState('2026')
  const [cliente, setCliente] = useState('')
  const [telefono, setTelefono] = useState('')

  const [items, setItems] = useState<Item[]>(
    Array.from({ length: ROWS }, () => ({ ...EMPTY_ITEM })),
  )

  const [formaPago, setFormaPago] = useState('')
  const [tiempoOferta, setTiempoOferta] = useState('')
  const [tiempoEntrega, setTiempoEntrega] = useState('')

  const updateItem = (
    index: number,
    field: keyof Item,
    value: string,
  ) => {
    setItems((current) =>
      current.map((item, i) =>
        i === index
          ? {
            ...item,
            [field]: value,
          }
          : item,
      ),
    )
  }

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const cantidad = Number(item.cantidad.replace(',', '.')) || 0
      const precio = Number(item.precio.replace(',', '.')) || 0

      return sum + cantidad * precio
    }, 0)
  }, [items])

  const formatMoney = (value: number) => {
    return value.toLocaleString('es-BO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const clearForm = () => {
    setMes('')
    setAnio('2026')
    setCliente('')
    setTelefono('')
    setFormaPago('')
    setTiempoOferta('')
    setTiempoEntrega('')

    setItems(
      Array.from(
        {
          length: ROWS,
        },
        () => ({ ...EMPTY_ITEM }),
      ),
    )
  }

  const print = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-yellow-300 via-yellow-400 to-orange-500 p-4 sm:p-6 print:min-h-0 print:bg-white print:p-0">
      <div className="mx-auto w-full max-w-[820px]">

        {/* =========================
            CONTROLES
        ========================== */}
        <div className="mb-4 flex items-center justify-end gap-2 print:hidden">
          <button
            type="button"
            onClick={clearForm}
            className="rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Limpiar
          </button>

          <button
            type="button"
            onClick={print}
            className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black/80"
          >
            Imprimir
          </button>
        </div>

        {/* =========================
            HOJA
        ========================== */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[34px]
            border-[5px]
            border-[#252525]
            bg-white
            shadow-2xl
            print:rounded-none
            print:border-[3px]
            print:shadow-none
          "
        >
          {/* =========================
              CONTENIDO
          ========================== */}
          <div className="relative px-3 pb-5 pt-4 sm:px-4">

            {/* =========================
                HEADER
            ========================== */}
            <div className="grid grid-cols-[1fr_1fr] gap-3">

              {/* LOGO / DATOS IZQUIERDA */}
              <div>
                <div className="flex justify-start">
                  <img
                    src="/images/logo-karins.png"
                    alt="Imprenta Karin's"
                    className="h-[76px] w-auto object-contain sm:h-[82px]"
                  />
                </div>

                {/* WhatsApp */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-green-600 text-[11px] font-bold text-green-600">
                    W
                  </div>

                  <span className="text-[15px] font-bold text-[#292929]">
                    +591 68773067
                  </span>
                </div>

                {/* Dirección */}
                <div className="mt-1 flex items-start gap-2">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    ●
                  </div>

                  <div className="text-[11px] font-semibold leading-[13px] text-[#292929]">
                    <div>
                      Calle Florida Nº 923 entre 1er y 2do Anillo
                    </div>

                    <div className="pl-2">
                      1 cuadra y media antes del 2do Anillo
                    </div>
                  </div>
                </div>
              </div>

              {/* IMAGEN + PRO-FORMA */}
              <img
                src="/images/trabajos-imprenta.png"
                alt="Trabajos de imprenta"
                className="h-[120px] w-full object-contain"
              />
            </div>

            {/* =========================
                DATOS DE LA PROFORMA
            ========================== */}
            <div className="mt-4 space-y-2">

              {/* SANTA CRUZ / MES / AÑO */}
              <div className="flex items-end gap-1 font-serif text-[20px] font-bold leading-none text-[#292929]">

                <span className="shrink-0">
                  Santa Cruz
                </span>

                <div className="h-[19px] flex-1 border-b border-[#555]" />

                <span className="shrink-0">
                  Mes
                </span>

                <input
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  className="
                    h-[22px]
                    w-[150px]
                    border-0
                    border-b
                    border-[#555]
                    bg-transparent
                    px-1
                    text-center
                    font-serif
                    text-[17px]
                    font-normal
                    outline-none
                    focus:border-orange-500
                  "
                  placeholder=""
                />

                <input
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  className="
                    h-[22px]
                    w-[65px]
                    border-0
                    border-b
                    border-[#555]
                    bg-transparent
                    px-1
                    text-center
                    font-serif
                    text-[19px]
                    font-bold
                    outline-none
                    focus:border-orange-500
                  "
                />

                <div className="h-[19px] w-[45px] border-b border-[#555]" />
              </div>

              {/* CLIENTE / TELEFONO */}
              <div className="flex items-end gap-2 font-serif text-[20px] font-bold leading-none text-[#292929]">

                <span className="shrink-0">
                  Señor(es):
                </span>

                <input
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="
                    h-[23px]
                    min-w-0
                    flex-1
                    border-0
                    border-b
                    border-[#555]
                    bg-transparent
                    px-1
                    font-serif
                    text-[17px]
                    font-normal
                    outline-none
                    focus:border-orange-500
                  "
                />

                <span className="shrink-0">
                  Telf.:
                </span>

                <input
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="
                    h-[23px]
                    w-[125px]
                    border-0
                    border-b
                    border-[#555]
                    bg-transparent
                    px-1
                    font-serif
                    text-[17px]
                    font-normal
                    outline-none
                    focus:border-orange-500
                  "
                />
              </div>
            </div>

            {/* =========================
                TABLA
            ========================== */}
            <div className="relative mt-1 overflow-hidden">

              {/* MARCA DE AGUA */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-[115px]
                  z-0
                  select-none
                  overflow-hidden
                  text-center
                "
              >
                <div className="text-[68px] font-black tracking-[0.04em] text-blue-700/15">
                  IMPRENTA
                </div>

                <div className="-mt-1 text-[145px] font-black leading-[120px] tracking-[-0.08em] text-orange-500/20">
                  KARIN'S
                </div>

                <div className="mt-0 text-right pr-8 font-serif text-[46px] italic text-blue-700/20">
                  Otro Nivel
                </div>
              </div>

              {/* TABLA REAL */}
              <table className="relative z-10 w-full table-fixed border-collapse">
                <colgroup>
                  <col className="w-[17%]" />
                  <col className="w-[51%]" />
                  <col className="w-[15%]" />
                  <col className="w-[17%]" />
                </colgroup>

                <thead>
                  <tr className="h-[29px]">
                    <th className="border border-white bg-[#fa542b] px-1 text-[19px] font-black leading-none text-white">
                      CANT.
                    </th>

                    <th className="border border-white bg-[#fa542b] px-1 text-[19px] font-black tracking-[0.35em] leading-none text-white">
                      DETALLE
                    </th>

                    <th className="border border-white bg-[#fa542b] px-1 text-[19px] font-black leading-none text-white">
                      P. Unit
                    </th>

                    <th className="border border-white bg-[#fa542b] px-1 text-[19px] font-black leading-none text-white">
                      TOTAL
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => {
                    const cantidad =
                      Number(item.cantidad.replace(',', '.')) || 0

                    const precio =
                      Number(item.precio.replace(',', '.')) || 0

                    const rowTotal = cantidad * precio

                    return (
                      <tr
                        key={index}
                        className="h-[28px]"
                      >
                        {/* CANTIDAD */}
                        <td className="border border-[#252525] p-0">
                          <input
                            value={item.cantidad}
                            onChange={(e) =>
                              updateItem(
                                index,
                                'cantidad',
                                e.target.value,
                              )
                            }
                            className="
                              h-[27px]
                              w-full
                              border-0
                              bg-transparent
                              px-1
                              text-center
                              text-[13px]
                              outline-none
                              focus:bg-orange-50
                            "
                          />
                        </td>

                        {/* DETALLE */}
                        <td className="border border-[#252525] p-0">
                          <input
                            value={item.detalle}
                            onChange={(e) =>
                              updateItem(
                                index,
                                'detalle',
                                e.target.value,
                              )
                            }
                            className="
                              h-[27px]
                              w-full
                              border-0
                              bg-transparent
                              px-2
                              text-[13px]
                              outline-none
                              focus:bg-orange-50
                            "
                          />
                        </td>

                        {/* PRECIO */}
                        <td className="border border-[#252525] p-0">
                          <input
                            value={item.precio}
                            onChange={(e) =>
                              updateItem(
                                index,
                                'precio',
                                e.target.value,
                              )
                            }
                            inputMode="decimal"
                            className="
                              h-[27px]
                              w-full
                              border-0
                              bg-transparent
                              px-1
                              text-right
                              text-[13px]
                              outline-none
                              focus:bg-orange-50
                            "
                          />
                        </td>

                        {/* TOTAL */}
                        <td className="border border-[#252525] p-0">
                          <div
                            className="
                              flex
                              h-[27px]
                              w-full
                              items-center
                              justify-end
                              px-1
                              text-[13px]
                              tabular-nums
                            "
                          >
                            {rowTotal > 0
                              ? formatMoney(rowTotal)
                              : ''}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* =========================
                PARTE INFERIOR
            ========================== */}
            <div className="mt-1 grid grid-cols-[1fr_235px] items-end gap-2">

              {/* DATOS */}
              <div className="space-y-2 pl-3 text-[15px] text-[#292929]">

                {/* FORMA DE PAGO */}
                <div className="flex items-end">
                  <span className="shrink-0">
                    Forma de Pago:
                  </span>

                  <input
                    value={formaPago}
                    onChange={(e) =>
                      setFormaPago(e.target.value)
                    }
                    className="
                      ml-1
                      h-[23px]
                      min-w-0
                      flex-1
                      border-0
                      border-b
                      border-[#333]
                      bg-transparent
                      px-1
                      outline-none
                      focus:border-orange-500
                    "
                  />
                </div>

                {/* OFERTA */}
                <div className="flex items-end">
                  <span className="shrink-0">
                    Tiempo de Oferta:
                  </span>

                  <input
                    value={tiempoOferta}
                    onChange={(e) =>
                      setTiempoOferta(e.target.value)
                    }
                    className="
                      ml-1
                      h-[23px]
                      min-w-0
                      flex-1
                      border-0
                      border-b
                      border-[#333]
                      bg-transparent
                      px-1
                      outline-none
                      focus:border-orange-500
                    "
                  />
                </div>

                {/* ENTREGA */}
                <div className="flex items-end">
                  <span className="shrink-0">
                    Tiempo de Entrega:
                  </span>

                  <input
                    value={tiempoEntrega}
                    onChange={(e) =>
                      setTiempoEntrega(e.target.value)
                    }
                    className="
                      ml-1
                      h-[23px]
                      min-w-0
                      flex-1
                      border-0
                      border-b
                      border-[#333]
                      bg-transparent
                      px-1
                      outline-none
                      focus:border-orange-500
                    "
                  />
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex items-center justify-end gap-2">

                <div className="text-[25px] font-black text-[#292929]">
                  TOTAL
                </div>

                <div className="w-[135px] overflow-hidden rounded-[11px] border-[3px] border-[#292929] bg-[#e8e8e8]">

                  {/* BS */}
                  <div className="flex h-[38px] items-center border-b-2 border-[#292929]">
                    <div className="w-[48px] px-2 text-[17px] font-bold">
                      Bs.
                    </div>

                    <div className="flex-1 px-2 text-right text-[16px] font-bold tabular-nums">
                      {formatMoney(total)}
                    </div>
                  </div>

                  {/* SUS */}
                  <div className="flex h-[38px] items-center">
                    <div className="w-[48px] px-2 text-[17px] font-bold">
                      $us.
                    </div>

                    <input
                      inputMode="decimal"
                      className="
                        min-w-0
                        flex-1
                        bg-transparent
                        px-2
                        text-right
                        text-[16px]
                        font-bold
                        outline-none
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          ESTILOS DE IMPRESIÓN
      ========================== */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          input {
            color: #111 !important;
          }
        }
      `}</style>
    </div>
  )
}