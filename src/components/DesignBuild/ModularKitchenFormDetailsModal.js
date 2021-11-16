import React from 'react';
import PropTypes from 'prop-types';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { allowNChar, allowTypeOf } from 'utils/helper';
import FormInput from './FormInput';
import './Style.css';

const dayjs = require('dayjs');

const minDate = () =>
  dayjs()
    .add(1, 'day')
    .format('YYYY-MM-DD');

const ModularKitchen = ({
  name,
  nameError,
  nameErrorMessage,
  email,
  emailError,
  emailErrorMessage,
  phone,
  phoneError,
  phoneErrorMessage,
  address,
  addressError,
  addressErrorMessage,
  pincode,
  pincodeError,
  pincodeErrorMessage,
  city,
  cityError,
  cityErrorMessage,
  state,
  selectedState,
  stateError,
  stateErrorMessage,
  date,
  dateError,
  dateErrorMessage,
  time,
  timeError,
  timeErrorMessage,
  onChangeName,
  onChangeAddress,
  onChangeEmail,
  onChangePhone,
  onChangePincode,
  onChangeCity,
  onChangeState,
  onChangeDate,
  onChangeTime,
  onSubmitForm,
  col,
  btnMt
}) => (
  <form onSubmit={onSubmitForm}>
    <Row m="0 1rem">
      <Div col={col} pr="0px" pl="0px">
        <FormInput
          label=""
          type="text"
          placeholder="Name"
          onChange={onChangeName}
          value={name}
          feedBackError={nameError}
          feedBackMessage={nameErrorMessage}
        />
      </Div>
      <Div col={col} pr="0px" pl="0px">
        <FormInput
          label=""
          type="text"
          placeholder="Mobile No."
          onChange={onChangePhone}
          value={phone}
          feedBackError={phoneError}
          feedBackMessage={phoneErrorMessage}
        />
      </Div>
    </Row>
    <Row m="0 1rem">
      <Div col={col} pr="0px" pl="0px">
        <FormInput
          label=""
          type="email"
          placeholder="Email ID"
          onChange={onChangeEmail}
          value={email}
          feedBackError={emailError}
          feedBackMessage={emailErrorMessage}
        />
      </Div>
      <Div col={col} pr="0px" pl="0px">
        <FormInput
          label=""
          type="text"
          placeholder="City"
          onChange={onChangeCity}
          value={city}
          feedBackError={cityError}
          feedBackMessage={cityErrorMessage}
        />
      </Div>
    </Row>
    <Row m="0 1rem">
      <Div col={col} pr="0px" pl="0px">
        <div className="select-wrapper">
          <select
            onChange={onChangeState}
            placeholder="State/Region"
            style={{
              width: '100%',
              borderRadius: '5px',
              height: '50px',
              borderColor: '#E3E3E3',
              padding: '0px 8px',
              fontSize: '14px',
              color: '#7E7575',
              marginBottom: '10px',
              outline: 'none',
              backgroundColor: 'white'
            }}
          >
            <option value="State/Region" disabled selected>
              State/Region
            </option>
            {/* {console.log(state, 'state')} */}
            {state.map(val => (
              <option key={val.id} value={val.option}>
                {val.option}
              </option>
            ))}
          </select>
        </div>
      </Div>
      <Div col={col} pr="0px" pl="0px" className="select-wrapper-date">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label
            style={{
              marginRight: '5px',
              marginBottom: '10px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '5px',
              border: '1px solid rgb(227, 227, 227)',
              padding: '0px 8px',
              fontSize: '14px',
              color: 'rgb(126, 117, 117)'
            }}
          >
            Date
          </label>
          <input
            type="date"
            // id="start"
            value={date}
            min={minDate()}
            // placeholder="Date"
            // onFocus={(e) => {e.currentTarget.type = "date"}}
            // onBlur={(e) => {e.currentTarget.type = "text"}}
            onChange={onChangeDate}
            style={{
              // minWidth: '100%',
              borderRadius: '5px',
              height: '50px',
              // borderColor: '#E3E3E3',
              padding: '0px 8px',
              fontSize: '14px',
              color: '#7E7575',
              marginBottom: '10px',
              outline: 'none',
              backgroundColor: 'white',
              border: '1px solid #E3E3E3',
              flexGrow: '1'
            }}
          />
        </div>
        {dateError ? (
          <Text color="red" fontSize="10px" mt="0px">
            {dateErrorMessage}
          </Text>
        ) : null}
      </Div>
      <Div col={col} pr="0px" pl="0px">
        {/* <FormInput
          label=""
          type="text"
          placeholder="Preffered Time"
          // min={minDate()}
          value={date}
          onChange={onChangeDate}
          error={dateError}
          errorMessage={dateErrorMessage}
        /> */}
        <div className="select-wrapper">
          <select
            onChange={onChangeTime}
            style={{
              width: '100%',
              borderRadius: '5px',
              height: '50px',
              borderColor: '#E3E3E3',
              padding: '0px 8px',
              fontSize: '14px',
              color: '#7E7575',
              marginBottom: '10px',
              outline: 'none',
              backgroundColor: 'white'
            }}
          >
            <option value="State/Region" disabled selected>
              Preferred Timeline
            </option>
            {/* {console.log(time, 'time')} */}
            {time.map(val => (
              <option key={val.id} value={val.option}>
                {val.option}
              </option>
            ))}
          </select>
        </div>
      </Div>
      <Div col={col} style={{ display: 'flex' }} pr="0.625rem" pl="0.625rem">
        <Button
          mt="20px"
          style={{
            borderColor: '#F47020',
            color: '#F47020',
            backgroundColor: '#FFFFFF',
            borderRadius: '5px'
          }}
          fontFamily="regular"
          height="50px"
          m="auto"
          pl="15%"
          pr="15%"
        >
          Submit
        </Button>
      </Div>
    </Row>
  </form>
);

ModularKitchen.defaultProps = {
  name: '',
  email: '',
  phone: '',
  pincode: '',
  city: '',
  state: '',
  date: '',
  address: '',
  nameError: false,
  emailError: false,
  phoneError: false,
  pincodeError: false,
  addressError: false,
  nameErrorMessage: '',
  emailErrorMessage: '',
  phoneErrorMessage: '',
  addressErrorMessage: '',
  pincodeErrorMessage: '',
  col: '6',
  btnMt: '2rem'
};

ModularKitchen.propTypes = {
  name: PropTypes.string,
  nameError: PropTypes.bool,
  nameErrorMessage: PropTypes.string,
  onChangeName: PropTypes.func.isRequired,
  email: PropTypes.string,
  emailError: PropTypes.bool,
  emailErrorMessage: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  phone: PropTypes.string,
  phoneError: PropTypes.bool,
  phoneErrorMessage: PropTypes.string,
  onChangePhone: PropTypes.func.isRequired,
  address: PropTypes.string,
  addressError: PropTypes.bool,
  addressErrorMessage: PropTypes.string,
  onChangeAddress: PropTypes.func.isRequired,
  pincode: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  date: PropTypes.string,
  pincodeError: PropTypes.bool,
  pincodeErrorMessage: PropTypes.string,
  onChangePincode: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  col: PropTypes.string,
  btnMt: PropTypes.string
};

export default ModularKitchen;
