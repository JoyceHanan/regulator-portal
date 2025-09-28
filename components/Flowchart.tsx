import React from 'react';

// Node component for different types of workflow steps
const FlowNode: React.FC<{ children: React.ReactNode; style: React.CSSProperties; type?: 'main' | 'action' | 'edge' | 'process' }> = ({ children, style, type = 'main' }) => {
  const baseClasses = 'absolute flex items-center justify-center p-3 text-center rounded-lg shadow-lg text-sm font-medium';
  const typeClasses = {
    main: 'bg-blue-100 border-2 border-blue-500 text-blue-800',
    action: 'bg-green-100 border-2 border-green-500 text-green-800',
    edge: 'bg-yellow-100 border-2 border-yellow-500 text-yellow-800',
    process: 'bg-purple-100 border-2 border-purple-500 text-purple-800',
  };
  return <div className={`${baseClasses} ${typeClasses[type]}`} style={style}>{children}</div>;
};

// SVG component to draw connecting lines with arrowheads
const SvgLine: React.FC<{ path: string; dashed?: boolean }> = ({ path, dashed = false }) => (
  <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none">
    <path
      d={path}
      stroke="#6b7280"
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrowhead)"
      strokeDasharray={dashed ? '6,6' : 'none'}
    />
  </svg>
);

const Legend: React.FC = () => (
    <div className="absolute top-4 right-4 flex flex-col space-y-2 bg-white bg-opacity-80 p-3 rounded-lg border">
        <h4 className="font-bold text-sm">Legend</h4>
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500"></div>
            <span className="text-xs">Main Flow</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500"></div>
            <span className="text-xs">Action</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-500"></div>
            <span className="text-xs">Edge Case</span>
        </div>
         <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-purple-100 border-2 border-purple-500"></div>
            <span className="text-xs">Process</span>
        </div>
    </div>
)

export const Flowchart: React.FC = () => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Regulator Workflow</h3>
            <div className="relative h-[1000px] w-full max-w-4xl mx-auto">
                <svg className="absolute w-0 h-0">
                    <defs>
                        <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="8"
                            refY="3.5"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                        </marker>
                    </defs>
                </svg>

                {/* Nodes: Positions are calculated based on an ~800px wide container */}
                <FlowNode style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 180 }} type="main">Login to Portal</FlowNode>
                <FlowNode style={{ top: 150, left: '50%', transform: 'translateX(-50%)', width: 220, height: 80 }} type="main">View Compliance Dashboard</FlowNode>
                
                {/* Main Flow Actions */}
                <FlowNode style={{ top: 350, left: '15%', transform: 'translateX(-50%)', width: 200 }} type="action">Automated Alerts for Over-Harvest</FlowNode>
                <FlowNode style={{ top: 500, left: '15%', transform: 'translateX(-50%)', width: 180 }} type="action">Schedule Inspections</FlowNode>
                <FlowNode style={{ top: 350, left: '85%', transform: 'translateX(-50%)', width: 200 }} type="action">Generate Export Reports</FlowNode>

                {/* Edge Cases & Processes */}
                <FlowNode style={{ top: 500, left: '50%', transform: 'translateX(-50%)', width: 200 }} type="edge">Data Incomplete (Offline Sync)</FlowNode>
                <FlowNode style={{ top: 650, left: '50%', transform: 'translateX(-50%)', width: 200 }} type="edge">Email Reports During Downtime</FlowNode>
                <FlowNode style={{ top: 800, left: '50%', transform: 'translateX(-50%)', width: 180 }} type="edge">Issue New Rules</FlowNode>
                <FlowNode style={{ top: 800, left: '85%', transform: 'translateX(-50%)', width: 200 }} type="process">Upgrade Smart Contract</FlowNode>

                {/* SVG Lines connecting the nodes */}
                <SvgLine path="M 400 50 L 400 150" />
                <SvgLine path="M 290 190 L 130 350" />
                <SvgLine path="M 510 190 L 670 350" />
                <SvgLine path="M 400 230 L 400 500" />
                <SvgLine path="M 120 400 L 120 500" />
                <SvgLine path="M 400 550 L 400 650" />
                <SvgLine path="M 400 700 L 400 800" />
                <SvgLine path="M 490 825 L 580 825" />

                {/* Looping lines for edge cases */}
                <SvgLine path="M 300 525 C 100 450, 100 250, 290 190" dashed />
                <SvgLine path="M 500 675 C 700 550, 700 250, 510 190" dashed />
                <SvgLine path="M 680 800 C 950 600, 950 300, 510 190" dashed />
                
                <Legend />
            </div>
        </div>
    );
}