import React, { Component } from 'react';
import UnbxdTopSellers from 'components/Category/UnbxdTopSellers';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
class BestSeller extends React.Component {
    render() { 
        const { category } = this.props;
        return (
            // <div style={{marginTop:"30px", marginBottom:"30px"}}>
            // <div id="unbxd_category_top_sellers"></div>
            // </div>
            <Box display="inline-block" width="100%">
            <Container>
              <UnbxdTopSellers category={category} />
            </Container>
          </Box>
        );
    }
}
 
export default BestSeller;