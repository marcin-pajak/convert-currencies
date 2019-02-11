import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Error from './Error';

const CurrencyInfo = props => (
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
