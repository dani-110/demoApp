import {Datepicker, Icon, Input, Text} from '@ui-kitten/components';
import {Field} from '../@types';
import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {styles} from '../shared/styles';
import {CalendarIcon} from './icons';

export interface RenderFieldProps {
  Field: Field;
  State: {};
  onChange: (key: string, value: string | boolean) => void;
}
export interface RenderIconProps {}

export const RenderField = (props: RenderFieldProps): JSX.Element => {
  const {Field, State, onChange} = props;
  console.log(Field, 'Field, State ====>>>>');
  const [SecurePassword, setSecurePassword] = useState(true);
  const [IsEmailValid, setIsEmailValid] = useState(false);
  const togglePassword = (): void => {
    setSecurePassword(!SecurePassword);
  };

  const renderPasswordIcon = (props: RenderIconProps): React.ReactElement => (
    <TouchableWithoutFeedback onPress={togglePassword}>
      <Icon {...props} name={SecurePassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const validateEmail = (key: string, value: string) => {
    console.log(value);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false) {
      setIsEmailValid(false);
      onChange(key, value);
      return false;
    } else {
      onChange(key, value);
      setIsEmailValid(true);
    }
  };

  switch (Field?.type) {
    case 'id':
      return <Text style={styles.rowValue}>{State[Field.name]}</Text>;
    case 'string':
      return (
        <Input
          value={State[Field.name]}
          style={{flex: 1}}
          status="primary"
          placeholder={Field.label}
          onChangeText={text => onChange(Field.name, text)}
        />
      );
    case 'email':
      return (
        <Input
          value={State[Field.name]}
          style={{
            flex: 1,
            borderColor:
              Field.name != 'Email' ? (IsEmailValid ? 'green' : 'red') : '',
          }}
          status="primary"
          placeholder={Field.label}
          onChangeText={text => validateEmail(Field.name, text)}
        />
      );
    case 'password':
      return (
        <Input
          value={State[Field.name]}
          style={{flex: 1}}
          status="primary"
          placeholder={Field.label}
          onChangeText={text => onChange(Field.name, text)}
          secureTextEntry={SecurePassword}
          accessoryRight={renderPasswordIcon}
        />
      );
    case 'date':
      return (
        <Datepicker
          date={State[Field.name]}
          onSelect={text => onChange(Field.name, text)}
          accessoryRight={CalendarIcon}
          style={{flex: 1}}
        />
      );
    case 'textarea':
      return (
        <Input
          value={State[Field.name]}
          multiline={true}
          textStyle={{minHeight: 64, maxHeight: 120}}
          style={{flex: 1}}
          status="primary"
          placeholder={Field.label}
          onChangeText={text => onChange(Field.name, text)}
        />
      );
    default:
      return (
        <Text style={styles.rowValue}>
          {Field.type}
          {JSON.stringify(State[Field.name])}
        </Text>
      );
  }
};
