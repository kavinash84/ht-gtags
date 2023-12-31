import React from "react";
import styled from "styled-components";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Label from "hometown-components-dev/lib/LabelHtV1";

const Description = styled(Text)`
  ol {
    margin-top: 0;
    padding-left: 15px;
    list-style-type: disc;
  }
  ul {
    padding-left: 15px;
    li {
      /* font-family: light; */
    }
  }
`;

const Spec = ({ spec }) => {
  const { label, value } = spec;
  return (
    <Row display="block" m="0" pb="2px">
      <div>
        {label !== "Care Instructions" &&
          label !== "Returns / Cancellation" &&
          label !== "Service Assurance / Warranty" && (
            <Div col="6">
              <Label color="secondary" lh="1.6">
                {label}
              </Label>
            </Div>
          )}
        <Div
          col={
            label === "Care Instructions" ||
            label === "Note" ||
            label === "Service Assurance / Warranty" ||
            label === "Returns / Cancellation"
              ? "12"
              : "6"
          }
        >
          <Description
            mt="5px"
            mb="5px"
            itemProp="description"
            fontSize="0.875rem"
            dangerouslySetInnerHTML={{ __html: value }}
            lh="1.6"
            color="rgba(0, 0, 0, 0.65)"
            fontFamily="light"
          />
        </Div>
      </div>
    </Row>
  );
};

export default Spec;
