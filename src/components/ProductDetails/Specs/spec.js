import React from 'react';
import styled from 'styled-components';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';

const Description = styled(Text)`
  ol {
    margin-top: 0;
    padding-left: 15px;
    list-style-type: disc;
  }
  ul {
    padding-left: 15px;
    line-height: 20px;
    li {
      font-family: light;
    }
  }
`;

class Spec extends React.Component {
  render() {
    const { label, value, desc } = this.props.spec;

    return (
      <Row display="block" m="0" pb="2px">
        {label === 'Note' || label === 'Short Description' ? (
          <div style={{ fontStyle: 'normal', marginTop: '12px' }}>
            <div>
              {label !== 'Care Instructions' &&
                label !== 'Returns / Cancellation' &&
                label !== 'Service Assurance / Warranty' && (
                  <Div col="6">
                    <Label lh="1.6" fontFamily="regular" color=" rgba(0, 0, 0, 0.65)">
                      {label}
                    </Label>
                  </Div>
                )}
            </div>
            <div>
              <Div
                col={
                  label === 'Care Instructions' ||
                  label === 'Note' ||
                  label === 'Service Assurance / Warranty' ||
                  label === 'Returns / Cancellation'
                    ? '12'
                    : '6'
                }
              >
                <Description
                  mt="7px"
                  mb="7px"
                  itemProp="description"
                  fontSize="0.875rem"
                  dangerouslySetInnerHTML={{ __html: value }}
                  lh="1.8"
                  color="rgba(0, 0, 0, 0.65)"
                  fontFamily="light"
                  style={{ lineHeight: '25px' }}
                />
              </Div>
            </div>
          </div>
        ) : (
          <div
            style={{
              fontStyle: 'normal',
              display: 'flex',
              width: '100%',
              marginTop: '8px'
            }}
          >
            {label === 'Care Instructions' ||
            label === 'Returns / Cancellation' ||
            label === 'Service Assurance / Warranty' ? (
              <div>
                {label !== 'Care Instructions' &&
                  label !== 'Returns / Cancellation' &&
                  label !== 'Service Assurance / Warranty' && (
                    <Div col="6">
                      <Label lh="1.6" fontFamily="regular" color=" rgba(0, 0, 0, 0.65)">
                        {label}
                      </Label>
                    </Div>
                  )}
              </div>
            ) : (
              <div style={{ width: '50%' }}>
                {label !== 'Care Instructions' &&
                  label !== 'Returns / Cancellation' &&
                  label !== 'Service Assurance / Warranty' && (
                    <Div col="6">
                      <Label lh="1.6" fontFamily="regular" color=" rgba(0, 0, 0, 0.65)">
                        {label}
                      </Label>
                    </Div>
                  )}
              </div>
            )}

            <div>
              <Div
                col={
                  label === 'Care Instructions' ||
                  label === 'Note' ||
                  label === 'Service Assurance / Warranty' ||
                  label === 'Returns / Cancellation'
                    ? '12'
                    : '6'
                }
              >
                <Description
                  mb="7px"
                  itemProp="description"
                  fontSize="0.875rem"
                  dangerouslySetInnerHTML={{ __html: value }}
                  lh="1.8"
                  color="rgba(0, 0, 0, 0.65)"
                  fontFamily="light"
                />
              </Div>
            </div>
          </div>
        )}
      </Row>
    );
  }
}

export default Spec;
