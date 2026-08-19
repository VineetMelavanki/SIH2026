import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
const EpsilonTimeline = ({ timeline = [], budget = 10, height = 240, phaseLabels: _phaseLabels }) => {
  const data = timeline.map((pt, i) => ({
    round: i,
    epsilon: Number(pt.epsilon || 0),
  }));
  const maxEps = Math.max(budget, ...data.map((d) => d.epsilon), 0.1);
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 14, right: 16, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="eps-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0EA5A0" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#0EA5A0" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="round"
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickFormatter={(v) => `R${Number(v) + 1}`}
            axisLine={{ stroke: 'var(--border-subtle)' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, maxEps * 1.1]}
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickFormatter={(v) => `ε ${v.toFixed(1)}`}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              color: 'var(--text-primary)',
              fontSize: 12,
              boxShadow: 'var(--shadow-md)',
            }}
            labelFormatter={(v) => `Round ${Number(v) + 1}`}
            formatter={(v) => [`ε = ${Number(v).toFixed(2)}`, 'Cumulative epsilon']}
          />
          <ReferenceLine
            y={budget}
            stroke="var(--accent-amber)"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: `Budget ε = ${budget}`,
              position: 'right',
              fill: 'var(--accent-amber)',
              fontSize: 11,
              fontWeight: 700,
            }}
          />
          <Area
            type="monotone"
            dataKey="epsilon"
            stroke="var(--accent-teal)"
            strokeWidth={2.4}
            fill="url(#eps-fill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EpsilonTimeline;
