import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatPercent } from '../../utils/formatters.js';
import { REGION_LABELS } from '../../data/labels.js';

const BankComparisonChart = ({ banks = [], metricKey = 'localMacroF1', height = 280 }) => {
  const data = banks.map((b) => ({
    name: b.name?.split(' ')[0] || b.bankId,
    fullName: b.name,
    region: b.region,
    regionLabel: REGION_LABELS[b.region] || b.region,
    value: Number(b[metricKey] || 0),
    attackF1: Number(b.attackF1 || 0),
    benignF1: Number(b.benignF1 || 0),
    weight: Number(b.contributionWeight || 0),
  }));
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border-subtle)' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 1]}
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <Tooltip
            cursor={{ fill: 'rgba(139,92,246,0.06)' }}
            contentStyle={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              color: 'var(--text-primary)',
              fontSize: 12,
              boxShadow: 'var(--shadow-md)',
            }}
            formatter={(v, n) => formatPercent(v, 1)}
            labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
          />
          <Legend
            iconType="square"
            wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }}
          />
          <Bar
            dataKey="benignF1"
            name="Benign F1"
            stackId="a"
            fill="#5B9B64"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="attackF1"
            name="Attack F1"
            stackId="a"
            fill="#0EA5A0"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="value"
            name="Macro F1"
            fill="transparent"
            stroke="var(--accent-violet)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            barSize={2}
          />
          {data.map((_d, i) => (
            <g key={i}>{/* region accent handled by fill above */}</g>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BankComparisonChart;
