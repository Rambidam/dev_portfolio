import type { ProjectPreview } from "@/data/projects";

function DashboardMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col bg-[#0f1419] p-4">
      <div className="mb-4 flex items-center gap-2">
        <div
          className="h-6 w-6 rounded-md"
          style={{ backgroundColor: accent }}
        />
        <span className="text-xs font-bold tracking-widest text-white">
          CANTINA
        </span>
      </div>
      <p className="mb-4 text-[10px] leading-snug text-slate-400">
        Your sales data, finally making sense.
      </p>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[accent, "#334155", "#334155"].map((color, i) => (
          <div
            key={i}
            className="h-8 rounded-md"
            style={{ backgroundColor: i === 0 ? `${accent}33` : color }}
          />
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        <div className="flex flex-1 flex-col justify-end gap-1 rounded-md bg-[#1a2332] p-2">
          {[60, 80, 45, 90, 70].map((h, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                height: `${h * 0.12}px`,
                width: "100%",
                backgroundColor: i === 3 ? accent : "#334155",
                opacity: i === 3 ? 1 : 0.6,
              }}
            />
          ))}
        </div>
        <div
          className="h-full w-16 rounded-full border-8 border-[#1a2332]"
          style={{ borderTopColor: accent, borderRightColor: accent }}
        />
      </div>
    </div>
  );
}

function EcommerceMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div
        className="flex items-center justify-between px-4 py-2 text-[9px] font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        <span>PlumbersStock</span>
        <div className="flex gap-2 opacity-80">
          <span>Shop</span>
          <span>Deals</span>
          <span>Cart</span>
        </div>
      </div>
      <div className="relative flex-1 bg-gradient-to-br from-slate-100 to-slate-200 p-4">
        <div className="mb-2 h-16 rounded-lg bg-white/80 shadow-sm" />
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-md bg-white p-1.5 shadow-sm">
              <div className="mb-1 aspect-square rounded bg-slate-200" />
              <div className="h-1 w-full rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShopifyMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col">
      <div
        className="px-4 py-2 text-[9px] font-semibold text-white"
        style={{ backgroundColor: accent }}
      >
        Fresh Market
      </div>
      <div className="relative flex-1 bg-gradient-to-b from-green-700 to-green-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxNjUzMyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBmNDMyNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIi8+PC9zdmc+')] bg-cover opacity-60" />
        <div className="relative p-4">
          <p className="mb-1 text-[11px] font-bold leading-tight text-white">
            Fresh from
            <br />
            Local Farmers
          </p>
          <div
            className="mt-2 inline-block rounded-full px-3 py-1 text-[8px] font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            Shop Now
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-1 bg-white/95 p-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="text-center">
              <div className="mx-auto mb-0.5 h-6 w-6 rounded-full bg-green-100" />
              <div className="mx-auto h-1 w-8 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingMock({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex flex-1 flex-col justify-center p-5">
        <p className="mb-1 text-[9px] uppercase tracking-widest text-white/60">
          Welcome
        </p>
        <p className="mb-3 text-sm font-bold leading-tight text-white">
          Helping for life&apos;s
          <br />
          best sequel.
        </p>
        <div
          className="inline-block w-fit rounded-full px-4 py-1.5 text-[8px] font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          Get Started
        </div>
      </div>
      <div className="relative h-20 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

const previewMap: Record<
  ProjectPreview,
  React.ComponentType<{ accent: string }>
> = {
  dashboard: DashboardMock,
  ecommerce: EcommerceMock,
  shopify: ShopifyMock,
  landing: LandingMock,
};

export default function ProjectPreviewMock({
  type,
  accent,
}: {
  type: ProjectPreview;
  accent: string;
}) {
  const Component = previewMap[type];
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl">
      <Component accent={accent} />
    </div>
  );
}
