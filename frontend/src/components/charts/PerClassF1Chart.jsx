import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { classColor, CLASS_LABELS } from '../../data/labels.js';
import { formatPercent } from '../../utils/formatters.js';

const PerClassF1Chart = ({ perClass, height = 280 }) => {
  const data = (perClass || []).map((row) => ({
    label: CLASS_LABELS[row.classId] || row.classId,
    classId: row.classId,
    f1: Number(row.f1 || 0),
    precision: Number(row.precision || 0),
    recall: Number(row.recall || 0),
  }));
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 14, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis
            dataKey="label"
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
            cursor={{ fill: 'rgba(14,165,160,0.06)' }}
            contentStyle={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              color: 'var(--text-primary)',
              fontSize: 12,
              boxShadow: 'var(--shadow-md)',
            }}
            formatter={(v) => formatPercent(v, 1)}
          />
          <Bar dataKey="f1" radius={[8, 8, 0, 0]} maxBarSize={48}>
            <LabelList
              dataKey="f1"
              position="top"
              formatter={(v) => formatPercent(v, 0)}
              fill="var(--text-secondary)"
              fontSize={11}
            />
            {data.map((d, i) => (
              <Cell key={i} fill={classColor(d.classId)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerClassF1Chart;
