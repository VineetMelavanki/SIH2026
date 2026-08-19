import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatPercent } from '../../utils/formatters.js';

const UtilityPrivacyChart = ({ curve = [], height = 280 }) => {
  const data = curve.map((pt) => ({
    epsilon: Number(pt.epsilon || 0),
    macroF1: Number(pt.macroF1 || 0),
    accuracy: Number(pt.accuracy || 0),
    scenario: pt.scenario,
  }));
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="utility-fill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0EA5A0" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="epsilon"
            type="number"
            domain={['auto', 'auto']}
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            axisLine={{ stroke: 'var(--border-subtle)' }}
            tickLine={false}
            label={{
              value: 'Cumulative ε (higher = less private)',
              position: 'insideBottomRight',
              offset: -4,
              fill: 'var(--text-muted)',
              fontSize: 11,
            }}
          />
          <YAxis
            domain={[0.65, 1]}
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            axisLine={false}
            tickLine={false}
            width={46}
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
            formatter={(v, name) =>
              name === 'epsilon' ? `ε = ${Number(v).toFixed(2)}` : formatPercent(v, 1)
            }
            labelFormatter={(label, payload) => payload?.[0]?.payload?.scenario || label}
          />
          <Legend
            iconType="plainline"
            wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }}
          />
          <Line
            type="monotone"
            dataKey="macroF1"
            name="Global Macro F1"
            stroke="url(#utility-fill)"
            strokeWidth={3}
            dot={{ r: 5, fill: 'var(--bg-surface)', stroke: '#0EA5A0', strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            name="Global Accuracy"
            stroke="var(--accent-violet)"
            strokeWidth={2.2}
            strokeDasharray="5 4"
            dot={{ r: 4, fill: 'var(--bg-surface)', stroke: '#8B5CF6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UtilityPrivacyChart;
