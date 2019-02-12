import React, { SFC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Error from './Error';

export type CurrencyInfoProps = {
  baseCurrency: string;
  targetCurrency: string;
  date: string;
  rate: number;
  error: boolean | string;
};

const CurrencyInfo: SFC<CurrencyInfoProps> = props => (
  <Card>
    <div className="u-positionRelative">
      <CardContent>
        <Typography variant="h6" component="p">
          {`1 ${props.baseCurrency} equals ${props.rate} ${
            props.targetCurrency
          }`}
        </Typography>
        <Typography color="textSecondary">Last updated {props.date}</Typography>
        {props.error && <Error>{props.error}</Error>}
      </CardContent>
    </div>
  </Card>
);

export default CurrencyInfo;
