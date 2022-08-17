import React from "react";
import Helmet from "react-helmet";
import ContainerHtV1 from "hometown-components-dev/lib/ContainerHtV1";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import RowHtV1 from "hometown-components-dev/lib/RowHtV1";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import TextHtV1 from "hometown-components-dev/lib/TextHtV1";
import ImageHtV1 from "hometown-components-dev/lib/ImageHtV1";
import SectionHtV1 from "hometown-components-dev/lib/SectionHtV1";
import TitleBar from "components/TitleBar";

const faqData = require("../../data/FAQ");

const styles = require("./StaticPages.scss");
const CloseIcon = require("../../../static/minus-round.svg");
const OpenIcon = require("../../../static/plus-round.svg");

const getFaqs = faqs => {
  let arr = [];
  faqs.map(item => {
    arr = [...arr, ...item.data];
  });
  const seoFaq = arr.map(faq => {
    const ques = Object.values(faq)[0];
    if (faq) {
      return {
        "@type": "Question",
        name: ques,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.ans
        }
      };
    }
    return "";
  });
  return JSON.stringify(seoFaq);
};

const FAQ = () => (
  <SectionHtV1 display="block" p="0" mb="0" height="auto">
    <Helmet>
      <script type="application/ld+json">
        {`
              {
                "@context" : "http://schema.org",
                "@type" : "FAQPage",
                "mainEntity": ${getFaqs(faqData)}
              }
            `}
      </script>
    </Helmet>
    <ContainerHtV1 type="container" pr="0.5rem" pl="0.5rem">
      <TitleBar title="FAQs" />
      <BoxHtV1
        className={styles.staticPageWrapper}
        type="block"
        pt="2rem"
        pb="2.5rem"
      >
        {/* eslint-disable */}
        <RowHtV1 ml="0" mr="0">
          {faqData.map((faqItem, index) => (
            <BoxHtV1 variant="col-12" mb="1rem" key={faqItem.key}>
              <HeadingHtV1
                fontFamily="400"
                fontSize="0.825rem"
                color="textLight"
                mb="1.5em"
              >
                {faqItem.key}
              </HeadingHtV1>
              {faqItem.data.map((faqContent, index) => (
                <BoxHtV1 className={styles.collposeBlock} key={String(index)}>
                  <button>
                    <HeadingHtV1
                      className={styles.collopseHeadingHtV1}
                      fontFamily="regular"
                      fontSize="1rem"
                      color="secondary"
                      lineHeight="2"
                      mb="1em"
                      ellipsis={false}
                    >
                      <BoxHtV1 display="flex">
                        <ImageHtV1
                          className={styles.close}
                          src={CloseIcon}
                          alt="Close"
                          float="left"
                          mr="0.625rem"
                        />
                        <ImageHtV1
                          className={styles.open}
                          src={OpenIcon}
                          alt="Open"
                          float="left"
                          mr="0.625rem"
                        />
                        {faqContent.que}
                      </BoxHtV1>
                      <TextHtV1
                        className={styles.collopseContent}
                        color="rgba(0,0,0,0.5)"
                        fontSize="0.875rem"
                        mb="1rem"
                        ml="2.125rem"
                        lh="1.5"
                        dangerouslySetInnerHTML={{ __html: faqContent.ans }}
                      />
                    </HeadingHtV1>
                  </button>
                </BoxHtV1>
              ))}
            </BoxHtV1>
          ))}
        </RowHtV1>
      </BoxHtV1>
    </ContainerHtV1>
  </SectionHtV1>
);

export default FAQ;
