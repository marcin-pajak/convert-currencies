import React, { SFC } from 'react';

import Typography from '@material-ui/core/Typography';

export type CurrencyInfoProps = {
  baseCurrency: string;
  targetCurrency: string;
  date: string;
  rate: number;
};

const CurrencyInfo: SFC<CurrencyInfoProps> = React.memo(props => (
  <>
    <Typography variant="h6" component="p">
      {`1 ${props.baseCurrency} equals ${props.rate} ${props.targetCurrency}`}
    </Typography>
    <Typography color="textSecondary">Last updated {props.date}</Typography>
  </>
));

export default CurrencyInfo;
