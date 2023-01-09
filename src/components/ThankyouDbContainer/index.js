import React, { Component } from 'react';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Helmet from "react-helmet";
import mapIcon from "../../../static/map-icon.svg";
class ThankyouDbContainer extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    {/* Facebook Pixel Code */}
                    <script>
                        {`
               window.addEventListener('load',function(){
                var x = 0;
                var myVar = setInterval(function(){
                  if(jQuery('h2:contains(Thank You For Your)').is(":visible")){
                    if(x == 0){
                      gtag('event', 'conversion', {'send_to': 'AW-832074530/h7wJCMXmzdcCEKLm4YwD'});
                      x = 1;
                    }
                    clearInterval(myVar);
                  }
                }, 1000);
              });
              `}
                    </script>
                    {/* End Facebook Pixel Code  */}
                    {/* Meta Pixel Code  */}
                    <script>
                        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1024172491523922');
fbq('track', 'DBlead');
`}
                    </script>
                    <noscript>{`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1024172491523922&ev=DBlead&noscript=1"
            />`}</noscript>
                    {/* End Facebook Pixel Code  */}
                </Helmet>

                <Section style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Section style={{ width: '100%', backgroundColor: '#f16333', padding: '50px', marginTop: '0px', marginBottom: '0px' }}>
                        <Heading style={{ fontSize: '35px', lineHeight: '45px', textAlign: 'center', color: 'white' }}>
                            THANK YOU <br /> FOR YOUR INTEREST
                        </Heading>
                    </Section>
                    <Section style={{ marginTop: '35px' }}>
                        <Text style={{ fontSize: '24px', lineHeight: '32px', textAlign: 'center', fontWeight: 'bold' }}>We are pleased to be part of creating <br /> your home interiors journey.</Text>
                        <Text style={{ fontSize: '22px', margin: '35px 0px', textAlign: 'center' }}>You can expect the following for your next steps in the process</Text>
                        <Div style={{ display: 'flex', justifyContent: 'center', width: '85%', margin: '0 7.5%' }}>
                            <Div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: '0px 20px' }}>
                                <Text style={{ fontSize: '110px', color: '#ababab' }}>1</Text>
                                <Text style={{ margin: '15px 10px 15px 60px', lineHeight: '20px' }}>One of the experts from the team will be getting in touch with you to understand your needs better and guide you further.</Text>
                            </Div>
                            <Div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: '0px 20px' }}>
                                <Text style={{ fontSize: '110px', color: '#ababab' }}>2</Text>
                                <Text style={{ margin: '15px 10px 15px 60px', lineHeight: '20px' }}>The expert will help match you with the ideal designer and shedule a call with them for further consultation.</Text>
                            </Div>
                            <Div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: '0px 20px' }}>
                                <Text style={{ fontSize: '110px', color: '#ababab' }}>3</Text>
                                <Text style={{ margin: '15px 10px 15px 60px', lineHeight: '20px' }}>The designer will guide you through online consultation or you can walk in to your nearest HomeTown store and continue the journey.</Text>
                            </Div>
                        </Div>
                    </Section>
                    <Div style={{ marginLeft: '10%' }}>
                        <a
                            rel="noopener"
                            target="_blank"
                            href="https://www.hometown.in/store-locator"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                                color: "rgba(51, 51, 51, 0.85)",
                                fontWeight: "bold"
                            }}
                        >
                            <img src={mapIcon} alt="Store Locator" />
                            <span>Find a HomeTown store near you.</span>
                        </a>
                    </Div>
                </Section>
            </div>
        );
    }
}
export default ThankyouDbContainer;