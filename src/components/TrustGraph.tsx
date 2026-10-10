import React, { useState } from 'react';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  AlertOctagon, 
  Globe, 
  KeyRound, 
  Zap, 
  MessageSquare,
  ShieldAlert,
  Info,
  X
} from 'lucide-react';
import { TrustGraphData, GraphNode, RiskLevel } from '../types';

interface TrustGraphProps {
  data: TrustGraphData;
}

export const TrustGraph: React.FC<TrustGraphProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const { nodes = [], edges = [] } = data;

  const getCategoryConfig = (category: GraphNode['category'], risk: RiskLevel) => {
    switch (category) {
      case 'actor':
        return {
          icon: ShieldAlert,
          bg: risk === 'critical' ? 'fill-rose-950 stroke-rose-500' : 'fill-slate-900 stroke-slate-500',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/40',
          label: 'Actor / Impersonator',
        };
      case 'domain':
        return {
          icon: Globe,
          bg: risk === 'critical' ? 'fill-rose-950 stroke-rose-400' : 'fill-cyan-950 stroke-cyan-400',
          textColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/40',
          label: 'Domain / Web Endpoint',
        };
      case 'credential':
        return {
          icon: KeyRound,
          bg: 'fill-amber-950 stroke-amber-400',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          label: 'Target Asset / Credential',
        };
      case 'vector':
        return {
          icon: Zap,
          bg: 'fill-purple-950 stroke-purple-400',
          textColor: 'text-purple-400',
          borderColor: 'border-purple-500/40',
          label: 'Psychological Vector',
        };
      case 'platform':
        return {
          icon: MessageSquare,
          bg: 'fill-blue-950 stroke-blue-400',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/40',
          label: 'Transmission Channel',
        };
      default:
        return {
          icon: AlertOctagon,
          bg: 'fill-rose-950 stroke-rose-400',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/40',
          label: 'Threat Consequence',
        };
    }
  };

  const filteredNodes = activeCategoryFilter === 'all'
    ? nodes
    : nodes.filter(n => n.category === activeCategoryFilter);

  const filteredEdges = edges.filter(e => 
    filteredNodes.some(n => n.id === e.source) && filteredNodes.some(n => n.id === e.target)
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Network className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white tracking-wide">
              TrustLens Threat Graph • Adversary Network Topology
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual map of threat actors, phishing domains, exfiltration vectors, and target assets.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeCategoryFilter === 'all' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Nodes
            </button>
            <button
              onClick={() => setActiveCategoryFilter('actor')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeCategoryFilter === 'actor' ? 'bg-rose-500/20 text-rose-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Actors
            </button>
            <button
              onClick={() => setActiveCategoryFilter('domain')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeCategoryFilter === 'domain' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Domains
            </button>
            <button
              onClick={() => setActiveCategoryFilter('credential')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeCategoryFilter === 'credential' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Assets
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.7))}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-[400px] mt-4 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden cursor-crosshair">
        {/* Radar Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(51, 65, 85, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 65, 85, 0.15) 1px, transparent 1px)`,
            backgroundSize: '30px 30px, 60px 60px, 60px 60px',
          }}
        />

        {/* Live Radar Sweep Effect in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-emerald-500/10 pointer-events-none">
          <div className="w-full h-full radar-sweep opacity-30" />
        </div>

        <svg 
          className="w-full h-full transition-transform duration-300"
          viewBox="0 0 800 440"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <defs>
            {/* Arrow marker for edges */}
            <marker
              id="arrow-critical"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
            </marker>
            <marker
              id="arrow-moderate"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
            <marker
              id="arrow-safe"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Render Connections / Edges */}
          {filteredEdges.map((edge) => {
            const sourceNode = filteredNodes.find(n => n.id === edge.source);
            const targetNode = filteredNodes.find(n => n.id === edge.target);

            if (!sourceNode || !targetNode) return null;

            const x1 = sourceNode.x ?? 250;
            const y1 = sourceNode.y ?? 150;
            const x2 = targetNode.x ?? 450;
            const y2 = targetNode.y ?? 250;

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            const strokeColor = edge.threatLevel === 'critical' ? '#f43f5e' : edge.threatLevel === 'moderate' ? '#f59e0b' : '#10b981';
            const markerId = `arrow-${edge.threatLevel}`;

            return (
              <g key={edge.id} className="transition-opacity hover:opacity-100">
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={strokeColor}
                  strokeWidth="2"
                  strokeDasharray={edge.threatLevel === 'critical' ? '4 2' : 'none'}
                  markerEnd={`url(#${markerId})`}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                {/* Edge Label Badge */}
                <rect
                  x={midX - 45}
                  y={midY - 10}
                  width="90"
                  height="20"
                  rx="6"
                  fill="#090d16"
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 3}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  className="select-none pointer-events-none"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Render Nodes */}
          {filteredNodes.map((node) => {
            const x = node.x ?? 300;
            const y = node.y ?? 200;
            const config = getCategoryConfig(node.category, node.riskLevel);
            const isSelected = selectedNode?.id === node.id;
            const isCritical = node.riskLevel === 'critical';

            return (
              <g
                key={node.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Halo for critical threat */}
                {isCritical && (
                  <circle
                    r="34"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    className="opacity-40 animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  r={isSelected ? 28 : 24}
                  className={`${config.bg} transition-all duration-200 group-hover:scale-110 shadow-lg`}
                  strokeWidth={isSelected ? '3' : '2'}
                />

                {/* Category label indicator */}
                <text
                  y="4"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  className="pointer-events-none select-none"
                >
                  {node.category === 'actor' ? 'ACT' : node.category === 'domain' ? 'DOM' : node.category === 'credential' ? 'KEY' : node.category === 'vector' ? 'VEC' : 'CHAN'}
                </text>

                {/* Node Label Below */}
                <g transform="translate(0, 36)">
                  <rect
                    x="-65"
                    y="-8"
                    width="130"
                    height="20"
                    rx="5"
                    fill="#030712"
                    stroke={isSelected ? '#34d399' : '#1f2937'}
                    strokeWidth="1"
                    className="opacity-95"
                  />
                  <text
                    textAnchor="middle"
                    y="5"
                    fill={isSelected ? '#34d399' : '#e2e8f0'}
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans"
                    className="pointer-events-none select-none"
                  >
                    {node.label.length > 20 ? node.label.substring(0, 18) + '...' : node.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="absolute top-3 right-3 max-w-xs w-full bg-slate-900/95 border border-slate-700/90 rounded-xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-200 z-20">
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-slate-800 text-emerald-400">
                  <Info className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {selectedNode.label}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {selectedNode.category} • {selectedNode.riskLevel}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Risk Severity:</span>
              <span className={
                selectedNode.riskLevel === 'critical' ? 'text-rose-400 font-bold' :
                selectedNode.riskLevel === 'moderate' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'
              }>
                {selectedNode.riskLevel.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2 flex items-center gap-4 text-[10px] text-slate-400 font-mono hidden sm:flex">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Adversary / Threat Vector</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Domain Endpoint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Target Credential</span>
          </div>
        </div>
      </div>
    </div>
  );
};
