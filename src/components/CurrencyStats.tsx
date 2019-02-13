import React, { SFC } from 'react';
import {
  Resizable,
  Baseline,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart
} from 'react-timeseries-charts';
import { TimeSeries } from 'pondjs';
import { GRAPH_STYLES } from '../common/graph.js';

export type CurrencyInfoProps = {
  baseCurrency: string;
  targetCurrency: string;
  points: any;
};

const CurrencyInfo: SFC<CurrencyInfoProps> = React.memo(props => {
  if (!props.points.length) {
    return null;
  }
  const series = new TimeSeries({
    name: 'currency_history',
    columns: ['time', 'value'],
    points: props.points
  });
  return (
    <Resizable>
      <ChartContainer
        title={`${props.targetCurrency} in last 30 days (in ${
          props.baseCurrency
        })`}
        titleStyle={{ fill: '#555', fontWeight: 500 }}
        timeRange={series.range()}
        format="%d %b '%y"
        timeAxisTickCount={3}
      >
        <ChartRow height="150">
          <YAxis
            id="value"
            min={series.min()}
            max={series.max()}
            width="60"
            format=",.2f"
          />
          <Charts>
            <LineChart
              axis="value"
              series={series}
              style={GRAPH_STYLES.style}
            />
            <Baseline
              axis="value"
              style={GRAPH_STYLES.baselineStyleLite}
              value={series.max()}
              label="Max"
              position="right"
            />
            <Baseline
              axis="value"
              style={GRAPH_STYLES.baselineStyleLite}
              value={series.min()}
              label="Min"
              position="right"
            />
            <Baseline
              axis="value"
              style={GRAPH_STYLES.baselineStyle}
              value={series.avg()}
              label="Avg"
              position="right"
            />
          </Charts>
        </ChartRow>
      </ChartContainer>
    </Resizable>
  );
});

export default CurrencyInfo;
