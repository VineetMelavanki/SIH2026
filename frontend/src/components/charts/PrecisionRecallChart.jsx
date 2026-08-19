import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
} from 'recharts';
import { classColor, CLASS_LABELS } from '../../data/labels.js';
import { formatPercent, formatCompact } from '../../utils/formatters.js';

const PrecisionRecallChart = ({ perClass, height = 300 }) => {
  const data = (perClass || []).map((row) => ({
    label: CLASS_LABELS[row.classId] || row.classId,
    classId: row.classId,
    precision: Number(row.precision || 0),
    recall: Number(row.recall || 0),
    support: Number(row.support || row.samples || 1),
  }));
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis
            type="number"
            dataKey="recall"
            name="Recall"
            domain={[0, 1]}
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            axisLine={{ stroke: 'var(--border-subtle)' }}
            tickLine={false}
            label={{
              value: 'Recall',
              position: 'insideBottomRight',
              offset: -2,
              fill: 'var(--text-muted)',
              fontSize: 11,
            }}
          />
          <YAxis
            type="number"
            dataKey="precision"
            name="Precision"
            domain={[0, 1]}
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            axisLine={false}
            tickLine={false}
            width={42}
            label={{
              value: 'Precision',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              fill: 'var(--text-muted)',
              fontSize: 11,
            }}
          />
          <ZAxis type="number" dataKey="support" range={[40, 500]} name="Support" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              color: 'var(--text-primary)',
              fontSize: 12,
              boxShadow: 'var(--shadow-md)',
            }}
            formatter={(v, name) =>
              name === 'Support' ? formatCompact(v) : formatPercent(v, 1)
            }
          />
          <Scatter data={data}>
            {data.map((d, i) => (
              <Cell key={i} fill={classColor(d.classId)} fillOpacity={0.85} stroke="#0B1220" strokeWidth={1} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecisionRecallChart;
