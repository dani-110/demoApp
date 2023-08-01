import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Field} from '../@types';
import {styles} from '../shared/styles';
import {RenderField} from './render-field.component';

interface GState {}

export interface RenderFieldsProps {
  Fields: Object[];
  State: {};
  setState?: React.Dispatch<React.SetStateAction<GState>>;
  onChange: (key: string, value: string | boolean) => void;
  fullWidth?: Boolean;
}

export const RenderFields = (props: RenderFieldsProps): JSX.Element => {
  //   const [Fields, setFields] = React.useState<Field[]>([]);
  const {Fields, State, onChange, setState, fullWidth} = props;

  console.log('CHild renderd');
  const ClearState = (key: string[]) => {
    if (!setState) return;
    const a = Object.assign({}, State);
    key.forEach(x => {
      delete a[x];
    });
    setState(a);
  };
  return (
    <>
      {Fields?.map((Field: Field, x) => {
        console.log(Field, State, 'Field ===>');
        return (
          <Layout
            key={x}
            style={[
              fullWidth ? styles.rowFull : styles.row,
              (1 * x + 2) % 4 == 0 || (1 * x + 1) % 4 == 0
                ? styles.evenRow
                : styles.evenOdd,
            ]}>
            {/* <Text style={styles.rowName}>{Field.label}</Text> */}
            <RenderField
              State={State}
              Field={Field}
              onChange={onChange}
              clearState={ClearState}
            />
          </Layout>
        );
      })}
    </>
  );
};
// export const MemoizedRenderFields = React.memo(RenderFields);
