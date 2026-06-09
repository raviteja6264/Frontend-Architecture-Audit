import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, AlertTriangle, Cpu, Layers, Activity, Clock, HardDrive, RefreshCw, 
  Sliders, Globe, Sparkles, CheckCircle, Flame, ArrowRight, Play, Server, Terminal
} from "lucide-react";

interface HeatmapNode {
  id: string;
  title: string;
  category: "State" | "Delivery" | "Rendering" | "Network";
  initialSeverity: "critical" | "heavy" | "warning" | "optimized";
  currentSeverity: "critical" | "heavy" | "warning" | "optimized";
  initialMetric: string;
  currentMetric: string;
  initialLatency: number; // in ms
  currentLatency: number; // in ms
  description: string;
  rootCause: string;
  remedy: string;
  isOptimized: boolean;
}

interface Archetype {
  id: string;
  name: string;
  description: string;
  initialScore: number;
  nodes: HeatmapNode[];
}

const ARCHETYPES: Archetype[] = [
  {
    id: "saas-dashboard",
    name: "Enterprise SaaS Dashboard",
    description: "Highly interactive admin pane, complex tables, real-time filters, and multi-tab charts.",
    initialScore: 42,
    nodes: [
      {
        id: "context-cascade",
        title: "Monolithic Context Providers",
        category: "State",
        initialSeverity: "critical",
        currentSeverity: "critical",
        initialMetric: "Full tree update loop",
        currentMetric: "Full tree update loop",
        initialLatency: 280,
        currentLatency: 280,
        description: "Nested context stores force rendering of the entire layout on every keystroke in search inputs.",
        rootCause: "Putting rapid form state and static user configs in the same top-level React context wrapper.",
        remedy: "Decouple into separate slices, use local uncontrolled state or debounced callback boundaries.",
        isOptimized: false
      },
      {
        id: "bundle-split",
        title: "Missing Route Bundle-Splitting",
        category: "Delivery",
        initialSeverity: "critical",
        currentSeverity: "critical",
        initialMetric: "2.4MB initial payload",
        currentMetric: "2.4MB initial payload",
        initialLatency: 1400,
        currentLatency: 1400,
        description: "Standard dynamic module layouts loaded upfront. Codebases are entirely combined into a single bundle chunk.",
        rootCause: "Importing tab panes and lazy routes using ES static import statements instead of dynamic imports.",
        remedy: "Incorporate 'React.lazy()' and Suspense bounds around separate dashboard view paths.",
        isOptimized: false
      },
      {
        id: "unvirtualized-list",
        title: "Deep Non-Virtualized Lists",
        category: "Rendering",
        initialSeverity: "heavy",
        currentSeverity: "heavy",
        initialMetric: "250 complex inline rows",
        currentMetric: "250 complex inline rows",
        initialLatency: 480,
        currentLatency: 480,
        description: "Dense transaction record lists rendering detailed JSX element components simultaneously.",
        rootCause: "Creating 1500+ active DOM text elements, badges, and popover components in standard map loops.",
        remedy: "Utilize list virtualization ('react-window') to render only rows inside the viewport.",
        isOptimized: false
      },
      {
        id: "heavy-charts",
        title: "Static Chart Packages",
        category: "Delivery",
        initialSeverity: "heavy",
        currentSeverity: "heavy",
        initialMetric: "820KB bundle size",
        currentMetric: "820KB bundle size",
        initialLatency: 350,
        currentLatency: 350,
        description: "Heavy data visualization scripts parsed and compiled during early page load, delaying interaction.",
        rootCause: "SaaS charts loaded eagerly on index-landing instead of asynchronous dynamic bundle chunks.",
        remedy: "Configure lazy loaders to fetch chart libraries only after the active tab is clicked.",
        isOptimized: false
      },
      {
        id: "double-api",
        title: "Duplicate Telemetry Calls",
        category: "Network",
        initialSeverity: "warning",
        currentSeverity: "warning",
        initialMetric: "3 identical payload fetches",
        currentMetric: "3 identical payload fetches",
        initialLatency: 650,
        currentLatency: 650,
        description: "Concurrent backend endpoints queries firing repeated user profiles data due to disconnected query channels.",
        rootCause: "Multiple isolated hooks calling standard fetch queries simultaneously without state hydration controls.",
        remedy: "Deploy central caching hooks or TanStack query caching keys to de-duplicate fetches.",
        isOptimized: false
      },
      {
        id: "dom-recalculate",
        title: "Layout Thrashing Cycle",
        category: "Rendering",
        initialSeverity: "warning",
        currentSeverity: "warning",
        initialMetric: "Direct height readings",
        currentMetric: "Direct height readings",
        initialLatency: 190,
        currentLatency: 190,
        description: "Repetitive DOM dimension readings coupled to reactive styling updates, triggering styling invalidation.",
        rootCause: "Reading offsetHeight properties inside interactive window scroll or drag handlers.",
        remedy: "Batch measurements in requestAnimationFrame blocks or utilize passive IntersectionObserver loops.",
        isOptimized: false
      },
      {
        id: "edge-fonts",
        title: "Font Pre-render Links",
        category: "Delivery",
        initialSeverity: "optimized",
        currentSeverity: "optimized",
        initialMetric: "Pre-connected CDN",
        currentMetric: "Pre-connected CDN",
        initialLatency: 35,
        currentLatency: 35,
        description: "Premium Google web fonts and assets configured to connect instantly to the browser.",
        rootCause: "Already correctly aligned with link optimizations.",
        remedy: "Keep current dns-prefetch and preconnect headers intact inside head tags.",
        isOptimized: true
      },
      {
        id: "image-meta",
        title: "Responsive Thumbnails",
        category: "Delivery",
        initialSeverity: "optimized",
        currentSeverity: "optimized",
        initialMetric: "Compressed AVIF assets",
        currentMetric: "Compressed AVIF assets",
        initialLatency: 45,
        currentLatency: 45,
        description: "Visual files and avatar cards served in progressive formats with correct responsive bounds.",
        rootCause: "Proper setup utilizing Cloudflare edge auto-conversion logic.",
        remedy: "Verify caching is maintained for static resource folder paths.",
        isOptimized: true
      }
    ]
  },
  {
    id: "ecommerce-web",
    name: "E-Commerce storefront",
    description: "Rapid content load, heavy media layout (images, promos), user reviews, static generation feeds.",
    initialScore: 54,
    nodes: [
      {
        id: "raw-images",
        title: "Un-Optimized RAW Images",
        category: "Delivery",
        initialSeverity: "critical",
        currentSeverity: "critical",
        initialMetric: "14.5MB total catalog images",
        currentMetric: "14.5MB total catalog images",
        initialLatency: 2200,
        currentLatency: 2200,
        description: "Mobile users downloading full-resolution uncompressed JPEG formats inside active product listings grids.",
        rootCause: "Sourcing images from high-resolution raw assets directly instead of responsive pipelines.",
        remedy: "Implement dynamic CDN transformations, output WebP formats, and configure proper sizes parameters.",
        isOptimized: false
      },
      {
        id: "dynamic-hydra",
        title: "Eager Client Hydration",
        category: "Rendering",
        initialSeverity: "critical",
        currentSeverity: "critical",
        initialMetric: "Blocked main thread on boot",
        currentMetric: "Blocked main thread on boot",
        initialLatency: 920,
        currentLatency: 920,
        description: "React client takes over rendering for static footer nodes, menus, and reviews prior to item layouts.",
        rootCause: "Hydrating non-interactive peripheral layout elements simultaneously with functional page headers.",
        remedy: "Utilize streaming server generation or selectively delay hydration using modern islands code bases.",
        isOptimized: false
      },
      {
        id: "rating-loops",
        title: "Reactive Star Rating Calculations",
        category: "Rendering",
        initialSeverity: "heavy",
        currentSeverity: "heavy",
        initialMetric: "Duplicated math in loops",
        currentMetric: "Duplicated math in loops",
        initialLatency: 310,
        currentLatency: 310,
        description: "Calculating weighted arithmetic product stars directly within list mapping renders.",
        rootCause: "Performing O(N) calculations in component functions instead of caching values in static catalog objects.",
        remedy: "Memoize computations using standard React 'useMemo' arrays tracking item datasets directly.",
        isOptimized: false
      },
      {
        id: "add-cart-cls",
        title: "Layout Shifting 'Cart Flyout'",
        category: "Rendering",
        initialSeverity: "heavy",
        currentSeverity: "heavy",
        initialMetric: "0.28 Cumulative Layout Shift",
        currentMetric: "0.28 Cumulative Layout Shift",
        initialLatency: 380,
        currentLatency: 380,
        description: "Product details jump down over 120 pixels when lazy promotional notification blocks resolve dynamically above.",
        rootCause: "Assigning no initial visual dimensions boundary bounds to top dynamic modules.",
        remedy: "Define hard minimum heights or skeleton structures to hold vertical spacing during client runtime resolve.",
        isOptimized: false
      },
      {
        id: "cart-cookie",
        title: "Live Price Fetch Latency",
        category: "Network",
        initialSeverity: "warning",
        currentSeverity: "warning",
        initialMetric: "780ms API wait times",
        currentMetric: "780ms API wait times",
        initialLatency: 780,
        currentLatency: 780,
        description: "Cart counters block early interactions waiting for live transactional safety verification responses.",
        rootCause: "Executing deep relational database scans synchronously at edge gateways for simple page displays.",
        remedy: "Leverage temporary Redis session caching gates for rapid client visual totals validation.",
        isOptimized: false
      },
      {
        id: "third-party-chat",
        title: "Customer Chat Widget Embeds",
        category: "Delivery",
        initialSeverity: "warning",
        currentSeverity: "warning",
        initialMetric: "420KB script blocking",
        currentMetric: "420KB script blocking",
        initialLatency: 520,
        currentLatency: 520,
        description: "Third-party chat scripts blocking main execution paths prior to Largest Contentful Paint (LCP) completion.",
        rootCause: "Inserting script tags statically directly in head document bindings without defer attributes.",
        remedy: "Defer chat injection helper logic until 3.5 seconds after page loads, or load only on active mouse movement.",
        isOptimized: false
      },
      {
        id: "checkout-cdn",
        title: "Payment Form Caching",
        category: "Delivery",
        initialSeverity: "optimized",
        currentSeverity: "optimized",
        initialMetric: "Edge CDN Cached Layouts",
        currentMetric: "Edge CDN Cached Layouts",
        initialLatency: 28,
        currentLatency: 28,
        description: "Checkout assets served over ultra-fast content networks with aggressive caching variables enabled.",
        rootCause: "Strict CDN cache boundaries configured properly.",
        remedy: "None. Caching handles static elements distribution optimally.",
        isOptimized: true
      },
      {
        id: "geo-pricing",
        title: "Localized Price Maps",
        category: "Network",
        initialSeverity: "optimized",
        currentSeverity: "optimized",
        initialMetric: "Edge middleware currency selector",
        currentMetric: "Edge middleware currency selector",
        initialLatency: 15,
        currentLatency: 15,
        description: "Currencies parsed via lightweight edge processes based on IP geolocation prior to page render.",
        rootCause: "Leverages modern router middleware controls.",
        remedy: "Maintain lightweight configuration arrays to guarantee swift execution times.",
        isOptimized: true
      }
    ]
  }
];

export default function PerformanceHeatmap() {
  const [activeArchetypeId, setActiveArchetypeId] = useState<string>("saas-dashboard");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("context-cascade");
  const [archetypesState, setArchetypesState] = useState<Archetype[]>(JSON.parse(JSON.stringify(ARCHETYPES)));
  const [isRefactoring, setIsRefactoring] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  
  const currentArchetype = archetypesState.find(a => a.id === activeArchetypeId) || archetypesState[0];
  const selectedNode = currentArchetype.nodes.find(n => n.id === selectedNodeId) || currentArchetype.nodes[0];

  // Sync selected node when switcher shifts
  useEffect(() => {
    const defaultNode = currentArchetype.nodes[0];
    if (defaultNode) {
      setSelectedNodeId(defaultNode.id);
    }
  }, [activeArchetypeId]);

  // Calculate global application performance score based on actual latency
  const currentPerformanceScore = (() => {
    const nodes = currentArchetype.nodes;
    const maxLatencyPotential = nodes.reduce((sum, n) => sum + n.initialLatency, 0);
    const currentLatencySum = nodes.reduce((sum, n) => sum + n.currentLatency, 0);
    const scoreRange = 100 - currentArchetype.initialScore;
    const latencySavingsPercentage = 1 - (currentLatencySum / maxLatencyPotential);
    const computedScore = Math.round(currentArchetype.initialScore + (latencySavingsPercentage * scoreRange));
    return Math.min(Math.max(computedScore, 10), 99);
  })();

  const getSeverityStyles = (severity: "critical" | "heavy" | "warning" | "optimized") => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-rose-500/25 hover:bg-rose-500/35 border-rose-500/50 text-rose-300",
          glow: "shadow-rose-950/20 shadow-md",
          iconColor: "text-rose-450",
          badge: "bg-rose-500/10 border-rose-500/30 text-rose-400"
        };
      case "heavy":
        return {
          bg: "bg-orange-500/25 hover:bg-orange-500/35 border-orange-500/50 text-orange-300",
          glow: "shadow-orange-950/20 shadow-md",
          iconColor: "text-orange-450",
          badge: "bg-orange-500/10 border-orange-500/30 text-orange-400"
        };
      case "warning":
        return {
          bg: "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/40 text-amber-300",
          glow: "shadow-amber-950/20 shadow-sm",
          iconColor: "text-amber-450",
          badge: "bg-amber-500/10 border-amber-500/30 text-amber-400"
        };
      case "optimized":
        return {
          bg: "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/35 text-emerald-300",
          glow: "shadow-emerald-950/10",
          iconColor: "text-emerald-450",
          badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        };
    }
  };

  const executeMockRefactor = () => {
    if (selectedNode.isOptimized || isRefactoring) return;

    setIsRefactoring(true);
    setTerminalLogs([]);

    const steps = [
      `[CRITICAL DIAGNOSTIC]: Scanning target node '${selectedNode.id}'...`,
      `[STEP 1]: Mapping data dependencies and reference loops. Detected bottleneck in category '${selectedNode.category}'.`,
      `[STEP 2]: Isolating core logic thread. Processing with refactoring playbook.`,
      `[STEP 3]: Injecting optimizations: ${selectedNode.remedy.split(",")[0]}.`,
      `[STEP 4]: Testing latency performance constraints. Calculating structural improvements...`,
      `[SUCCESS]: Hot reloading optimized bounds. Latency dropped by ${Math.round((selectedNode.initialLatency - (selectedNode.initialLatency * 0.15)))}ms!`
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < steps.length) {
        setTerminalLogs(prev => [...prev, steps[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        
        // Mutate local state
        setArchetypesState(prev => {
          return prev.map(arc => {
            if (arc.id === activeArchetypeId) {
              const updatedNodes = arc.nodes.map(n => {
                if (n.id === selectedNodeId) {
                  return {
                    ...n,
                    isOptimized: true,
                    currentSeverity: "optimized" as const,
                    currentMetric: "Optimized // Playbook Configured",
                    currentLatency: Math.max(Math.round(n.initialLatency * 0.12), 15)
                  };
                }
                return n;
              });
              return { ...arc, nodes: updatedNodes };
            }
            return arc;
          });
        });
        
        setIsRefactoring(false);
      }
    }, 450);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl relative overflow-hidden" id="perf-heatmap-section">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded">
            Interactive Diagnostic Tool
          </span>
          <h4 className="text-slate-100 font-sans font-bold text-sm sm:text-base mt-2 uppercase tracking-tight">
            React Application Architecture Bottleneck Map
          </h4>
          <p className="text-slate-500 text-[11px] mt-0.5">
            Click on any module grid cell below to inspect its telemetry and test refactoring improvements live.
          </p>
        </div>

        {/* Archetype switcher tab */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 shrink-0 self-start sm:self-auto">
          {archetypesState.map(arc => (
            <button
              key={arc.id}
              onClick={() => setActiveArchetypeId(arc.id)}
              className={`py-1.5 px-3.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                activeArchetypeId === arc.id
                  ? "bg-slate-850 text-white border border-slate-800"
                  : "text-slate-500 hover:text-slate-350"
              }`}
            >
              {arc.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Status Bar / Score meter */}
      <div className="bg-slate-950/60 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Dynamic Score Dial */}
          <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-slate-900 border border-slate-800 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-950"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className={currentPerformanceScore > 80 ? "text-emerald-500" : currentPerformanceScore > 60 ? "text-amber-500" : "text-rose-500"}
                strokeWidth="2.5"
                strokeDasharray={`${currentPerformanceScore}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${currentPerformanceScore}, 100` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute font-mono font-black text-sm text-slate-100 flex flex-col items-center">
              <span>{currentPerformanceScore}</span>
              <span className="text-[6px] text-slate-500 uppercase tracking-widest font-bold -mt-1">Perf</span>
            </div>
          </div>
          
          <div>
            <h5 className="font-sans font-bold text-xs text-slate-200 uppercase tracking-tight">
              Calculated Performance Index
            </h5>
            <p className="text-slate-450 text-[11px] mt-0.5 max-w-sm">
              Archetype: <strong className="text-slate-300">{currentArchetype.name}</strong>. {currentArchetype.description}
            </p>
          </div>
        </div>

        {/* Global Key indicators */}
        <div className="flex gap-4 self-stretch sm:self-auto justify-around border-t sm:border-t-0 border-slate-900 pt-3 sm:pt-0 shrink-0">
          <div className="text-center sm:text-right">
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-600 block">Total Latency</span>
            <span className="text-sm font-mono font-bold text-white mt-0.5 block">
              {currentArchetype.nodes.reduce((sum, n) => sum + n.currentLatency, 0)}ms
            </span>
          </div>
          <div className="text-center sm:text-right border-l border-slate-900 pl-4 sm:pl-6">
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-600 block">Bottlenecks</span>
            <span className="text-sm font-mono font-bold text-rose-500 mt-0.5 block">
              {currentArchetype.nodes.filter(n => !n.isOptimized && (n.initialSeverity === "critical" || n.initialSeverity === "heavy")).length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid + Details Layout block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Heatmap Bento Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {currentArchetype.nodes.map((node) => {
            const styles = getSeverityStyles(node.currentSeverity);
            const isSelected = selectedNodeId === node.id;

            return (
              <motion.div
                key={node.id}
                layoutId={`heatmap-cell-${node.id}`}
                onClick={() => setSelectedNodeId(node.id)}
                className={`flex flex-col justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden h-28 ${styles.bg} ${
                  isSelected 
                    ? "border-indigo-500 ring-2 ring-indigo-500/20 z-10 scale-[1.01]" 
                    : "border-transparent"
                } ${styles.glow}`}
              >
                {/* Visual ripple heat layer on selection */}
                {isSelected && (
                  <motion.div
                    layoutId="heatmap-border-focused"
                    className="absolute inset-0 bg-indigo-500/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {node.category}
                    </span>
                    {node.isOptimized ? (
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      node.initialSeverity === "critical" ? (
                        <Flame className="w-3 h-3 text-rose-400 shrink-0 animate-pulse" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                      )
                    )}
                  </div>
                  
                  <h6 className="font-sans font-bold text-[11px] leading-tight text-slate-100 tracking-tight line-clamp-2">
                    {node.title}
                  </h6>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[9px] font-mono font-medium text-slate-450">
                    Latency
                  </span>
                  <span className={`text-[11px] font-mono font-black ${
                    node.currentSeverity === "optimized" ? "text-emerald-400" : "text-white"
                  }`}>
                    {node.currentLatency}ms
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Inspector Details Drawer */}
        <div className="lg:col-span-5 bg-slate-950/60 border border-slate-850 rounded-xl p-5 flex flex-col justify-between h-auto min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getSeverityStyles(selectedNode.currentSeverity).badge}`}>
                      {selectedNode.currentSeverity === "optimized" ? "Optimized" : `${selectedNode.currentSeverity} Alert`}
                    </span>
                    <span className="text-[9px] font-mono text-slate-550 font-semibold">
                      {selectedNode.category} Module
                    </span>
                  </div>
                  <h5 className="font-sans font-bold text-slate-105 text-sm uppercase tracking-tight mt-1.5">
                    {selectedNode.title}
                  </h5>
                </div>

                <div className="text-right">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-slate-600 block">Latency</span>
                  <span className={`text-sm font-mono font-black ${
                    selectedNode.currentSeverity === "optimized" ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {selectedNode.currentLatency}ms
                  </span>
                </div>
              </div>

              {/* Metrics Description */}
              <div className="text-[11.5px] leading-relaxed text-slate-400 space-y-3">
                <p>
                  <strong className="text-slate-300 block text-[10px] uppercase font-mono font-bold tracking-wide mb-0.5">Problem Context:</strong>
                  {selectedNode.description}
                </p>

                <p>
                  <strong className="text-rose-400/80 block text-[10px] uppercase font-mono font-bold tracking-wide mb-0.5">Root Cause Analysis:</strong>
                  {selectedNode.rootCause}
                </p>

                <p className="bg-slate-950 p-2.5 rounded-lg border border-slate-900/80 text-[11px] font-mono text-slate-350">
                  <strong className="text-indigo-400 block text-[9px] uppercase font-mono font-bold tracking-wide mb-1">Optimized Refactoring Code:</strong>
                  {selectedNode.remedy}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Micro compiler terminal simulation section */}
          <div className="mt-5 border-t border-slate-900 pt-4 flex flex-col gap-3">
            {terminalLogs.length > 0 && (
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-900/85 font-mono text-[9px] text-indigo-400 space-y-1 max-h-24 overflow-y-auto leading-normal">
                <div className="flex items-center gap-1.5 text-slate-600 border-b border-slate-900/70 pb-1 mb-1.5">
                  <Terminal className="w-3 h-3" />
                  <span>REFAC_SHELL v1.4 // LIVE COMPILATION</span>
                </div>
                {terminalLogs.map((log, lIdx) => (
                  <div key={lIdx} className={log.includes("[SUCCESS]") ? "text-emerald-400 font-bold" : log.includes("[CRITICAL") ? "text-rose-400" : "text-indigo-300"}>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Simulated Action triggers */}
            <button
              onClick={executeMockRefactor}
              disabled={selectedNode.isOptimized || isRefactoring}
              className={`w-full py-2.5 rounded-xl text-xxs font-mono uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedNode.isOptimized
                  ? "bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 font-bold"
                  : isRefactoring
                    ? "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed uppercase"
                    : "bg-indigo-650 hover:bg-indigo-550 text-white font-bold hover:scale-[1.01] active:scale-95"
              }`}
            >
              {selectedNode.isOptimized ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> Blueprint Code Base Cleaned
                </>
              ) : isRefactoring ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" /> Committing Fixes...
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-white" /> Simulate Refactoring Fix
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
