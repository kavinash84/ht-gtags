import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Section from 'hometown-components/lib/Section';
import TitleBar from 'components/TitleBar';

const styles = require('./StaticPages.scss');

const Terms = () => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Terms And Conditions" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <Row ml="0" mr="0">
          <Div>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We are committed to ensuring your satisfaction with any product you have ordered from us. Once the order
              is dispatched from our warehouse will not be refunded/ cancelled unless it has non-repairable
              manufacturing damages
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Introduction
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Welcome to the HomeTown.in, brought to you by Praxis Home Retail Ltd. In using the HomeTown.in service, of
              Praxis Home Retail Ltd. you are deemed to have accepted the terms and conditions listed below. All
              products/services and information displayed on HomeTown.in constitute an "invitation to offer". Your order
              for purchase constitutes your "offer" which shall be subject to the terms and conditions as listed below.
              HomeTown.in reserves the right to accept or reject your offer. If you have supplied us with your valid
              email address, we will notify you by email as soon as possible to confirm receipt of your order and email
              you again to confirm details and therefore process the order. Our acceptance of your order will take place
              upon dispatch of the product(s) ordered. No act or omission of HomeTown.in prior to the actual dispatch of
              the product(s) ordered will constitute acceptance of your offer.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Membership Eligibility
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Use of the Site is available only to persons who can form legally binding contracts under applicable law.
              Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including
              un-discharged insolvents etc. are not eligible to use the Site. If you are a minor i.e. under the age of
              18 years but at least 13 years of age you may use this Site only under the supervision of a parent or
              legal guardian who agrees to be bound by these Terms of Use. If your age is below that of 18 years your
              parents or legal guardians can transact on behalf of you if they are registered users. You are prohibited
              from purchasing any material which is for adult consumption the sale or purchase of which to/by minors are
              strictly prohibited.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown.in reserves the right to terminate your membership and refuse to provide you with access to the
              Site if HomeTown.in discovers that you are under the age of 18 years. The Site is not available to persons
              whose membership has been suspended or terminated by HomeTown.in for any reason whatsoever. If you are
              registering as a business entity, you represent that you have the authority to bind the entity to this
              User Agreement. Unless otherwise specified, the materials on this website are directed solely at those who
              access this website from India. HomeTown.in makes no representation that any products or services referred
              to in the materials on this website are appropriate for use, or available outside India. Those who choose
              to access this Site from outside India are responsible for compliance with local laws if and to the extent
              local laws are applicable. HomeTown.in will deliver the products only within India and will not be liable
              for any claims relating to any products ordered from outside India.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Except where additional terms and conditions are provided which are product specific, these terms and
              conditions supersede all previous representations, understandings, or agreements and shall prevail
              notwithstanding any variance with any other terms of any order submitted. By using the services of
              HomeTown.in you agree to be bound by the Terms and Conditions.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Account and Registration Obligations
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              If you use HomeTown.in, you shall be responsible for maintaining the confidentiality of your User ID and
              Password and you shall be responsible for all activities that occur under your User ID and Password. You
              agree that if you provide any information that is untrue, inaccurate, not current or incomplete or
              HomeTown.in has reasonable grounds to suspect that such information is untrue, inaccurate, not current or
              incomplete, or not in accordance with the this Terms of Use, HomeTown.in has the right to indefinitely
              suspend or terminate or block access of your membership with HomeTown.in.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontFamily="medium" fontSize="0.875rem" mb="0">
              You also agree to:
            </Text>
            <ol>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  Provide true, accurate, current and complete information about yourself as prompted by HomeTown's
                  registration form (such information being the "Registration Data"). All the information which
                  compulsorily needs to be filled are marked in asterix (*) sign.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  Maintain and promptly update the Registration Data to keep it true, accurate, current and complete. If
                  you provide any information that is untrue, inaccurate, incomplete, or not current or if HomeTown.in
                  has reasonable grounds to suspect that such information is untrue, inaccurate, not current or not in
                  accordance with the User Agreement, HomeTown.in has the right to indefinitely suspend or terminate
                  your membership and refuse to provide you with access to the Site
                </Text>
              </li>
            </ol>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Pricing Information
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              While HomeTown.in strives to provide accurate product and pricing information, pricing or typographical
              errors may occur. HomeTown.in cannot confirm the price of a product until after you order. In the event
              that a product is listed at an incorrect price or with incorrect information due to an error in pricing or
              product information, HomeTown.in shall have the right, at our sole discretion, to refuse or cancel any
              orders placed for that product, unless the product has already been dispatched. In the event that an item
              is mis-priced, HomeTown.in may, at its discretion, either contact you for instructions or cancel your
              order and notify you of such cancellation. Unless the product ordered by you has been dispatched, your
              offer will not be deemed accepted and HomeTown.in will have the right to modify the price of the product
              and contact you for further instructions using the e-mail address provided by you during the time of
              registration, or cancel the order and notify you of such cancellation. In the event that HomeTown.in
              accepts your order the same shall be debited to your credit card account and duly notified to you by email
              that the payment has been processed. The payment may be processed prior to HomeTown.in dispatch of the
              product that you have ordered. If we have to cancel the order after we have processed the payment, the
              said amount will be reversed back to your credit card account.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We strive to provide you with the best prices possible on HomeTown.in as well as in all our group stores
              under the corporate entity - Future Group. However, sometimes a price promotion and product offerings
              online may not match the price in a store. In our effort to be the lowest price provider in your
              particular geographic region, store pricing will sometimes differ from online prices. Prices and
              availability are subject to change without notice.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              There are additional shipping charges for Guwahati and other North East areas.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Third Party Products
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              PLEASE NOTE: Along with the other terms and conditions these additional terms are applicable in case you
              have bought any products not manufactured by HomeTown.in and its group companies. In other words these
              additional terms and conditions are applicable in case you buy products sold on HomeTown.in by third party
              vendors.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              You understand and agree that there may be certain products, which will be sold on the Site by third party
              sellers ('Sellers'). HomeTown.in may not be able to control the transactions or the acts and omissions of
              the Sellers in such transactions. When you buy such products from Sellers on the Site the following
              additional terms and conditions will become applicable:
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              All other terms and conditions of this User Agreement are applicable to such transactions. HomeTown.in
              will not be responsible for the products sold on the site by third party Seller/s.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Credit/Debit Card Details
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              You agree, understand and confirm that the credit card details provided by you for availing of services on
              HomeTown.in will be correct and accurate and you shall not use the credit card which is not lawfully owned
              by you, i.e. in a credit card transaction, you must use your own credit card. You further agree and
              undertake to provide the correct and valid credit card details to HomeTown.in. Further the said
              information will not be utilised and shared by HomeTown.in with any of the third parties unless required
              for fraud verifications or by law, regulation or court order. HomeTown.in will not be liable for any
              credit card fraud. The liability for use of a card fraudulently will be on you and the onus to 'prove
              otherwise' shall be exclusively on you.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Fraudulent /Declined Transactions
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown.in reserves the right to recover the cost of goods, collection charges and lawyers fees from
              persons using the Site fraudulently. HomeTown.in reserves the right to initiate legal proceedings against
              such persons for fraudulent use of the Site and any other unlawful acts or acts or omissions in breach of
              these terms and conditions.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Electronic Communications
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              When you visit the Site or send emails to us, you are communicating with us electronically. You consent to
              receive communications from us electronically. We will communicate with you by email or by posting notices
              on the Site. You agree that all agreements, notices, disclosures and other communications that we provide
              to you electronically satisfy any legal requirement that such communications be in writing.
            </Text>
          </Div>
          <Div>
            <Text color="rgba(0,0,0,0.7)" fontFamily="medium" fontSize="0.875rem" mb="0">
              You also agree to:
            </Text>
            <ol>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  That in the event that a non-delivery occurs on account of a mistake by you (i.e. wrong name or
                  address or any other wrong information) any extra cost incurred by HomeTown.in for redelivery shall be
                  claimed from you.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  That you will use the services provided by HomeTown.in, its affiliates, consultants and contracted
                  companies, for lawful purposes only and comply with all applicable laws and regulations while using
                  the Site and transacting on the Site.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  You will provide authentic and true information in all instances where such information is requested
                  of you. HomeTown.in reserves the right to confirm and validate the information and other details
                  provided by you at any point of time. If upon confirmation your details are found not to be true
                  (wholly or partly), HomeTown.in has the right in its sole discretion to reject the registration and
                  debar you from using the Services of HomeTown.in and / or other affiliated websites without prior
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  intimation whatsoever. That you are accessing the services available on this Site and transacting at
                  your sole risk and are using your best and prudent judgment before entering into any transaction
                  through this Site
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  That the address at which delivery of the product ordered by you is to be made will be correct and
                  proper in all respects.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
                  That before placing an order you will check the product description carefully. By placing an order for
                  a product you agree to be bound by the conditions of sale included in the item's description.
                </Text>
              </li>
            </ol>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              You may not use the Site for any of the following purposes:
            </Heading>
            <ol>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Disseminating any unlawful, harassing, libellous, abusive, threatening, harmful, vulgar, obscene, or
                  otherwise objectionable material.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Transmitting material that encourages conduct that constitutes a criminal offence, results in civil
                  liability or otherwise breaches any relevant laws, regulations or code of practice.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Gaining unauthorised access to other computer systems.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Interfering with any other person's use or enjoyment of the Site.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Breaching any applicable laws;
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Interfering or disrupting networks or web sites connected to the Site.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Making, transmitting or storing electronic copies of materials protected by copyright without the
                  permission of the owner.
                </Text>
              </li>
              <li>
                <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="0.5rem">
                  Transaction or publishing any information harmful for the harmony /illegal campaigning or the peace
                  and tranquility of society.
                </Text>
              </li>
            </ol>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown.in reserves full right to take appropriate action against you, for violating the above mentioned
              rules and regulations.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Colours
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We have made every effort to display the colours of the products that appear on the Site as accurately as
              possible. However, as the actual colours you see will depend on your monitor, we cannot guarantee that
              your monitor's display of any colours will be accurate.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Images
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              We strive hard to get the real image of every product listed, but it should be considered indicative only.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Modification of Terms & Conditions of Service
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown.in may at any time update the Terms & Conditions of Use of the site without any prior
              notification to you. You can access the latest version of the User Agreement at any given time on
              HomeTown.in. You should regularly review the Terms & Conditions on HomeTown.in. In the event the modified
              Terms & Conditions is not acceptable to you, you should discontinue using the service. However, if you
              continue to use the service you shall be deemed to have agreed to accept and abide by the modified Terms &
              Conditions of Use of this site.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Governing Law and Jurisdiction
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              This User Agreement shall be construed in accordance with the applicable laws of India. The Courts at
              Mumbai shall have exclusive jurisdiction in any proceedings arising out of this agreement.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Any dispute or difference either in interpretation or otherwise, of any terms of this User Agreement
              between the parties hereto, the same shall be referred to an independent arbitrator who will be appointed
              by Praxis Home Retail Ltd. and his decision shall be final and binding on the parties hereto. The above
              arbitration shall be in accordance with the Arbitration and Conciliation Act, 1996 as amended from time to
              time. The arbitration shall be held in Mumbai. The language of Arbitration shall be English. The High
              Court of judicature at Mumbai alone shall have the jurisdiction and the Laws of India shall apply.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Reviews, Feedback, Submissions
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              All reviews, comments, feedback, postcards, suggestions, ideas, and other submissions disclosed, submitted
              or offered to HomeTown.in on or by this Site or otherwise disclosed, submitted or offered in connection
              with your use of this Site (collectively, the "Comments") shall be and remain HomeTown.in property. Such
              disclosure, submission or offer of any Comments shall constitute an assignment to HomeTown.in of all
              worldwide rights, titles and interests in all copyrights and other intellectual properties in the
              Comments. Thus, HomeTown.in owns exclusively all such rights, titles and interests and shall not be
              limited in any way in its use, commercial or otherwise, of any Comments. HomeTown.in will be entitled to
              use, reproduce, disclose, modify, adapt, create derivative works from, publish, display and distribute any
              Comments you submit for any purpose whatsoever, without restriction and without compensating you in any
              way. HomeTown.in is and shall be under no obligation (1) to maintain any Comments in confidence; (2) to
              pay you any compensation for any Comments; or (3) to respond to any Comments. You agree that any Comments
              submitted by you to the Site will not violate this policy or any right of any third party, including
              copyright, trademark, privacy or other personal or proprietary right(s), and will not cause injury to any
              person or entity. You further agree that no Comments submitted by you to the Site will be or contain
              libellous or otherwise unlawful, threatening, abusive or obscene material, or contain software viruses,
              political campaigning, commercial solicitation, chain letters, mass mailings or any form of "spam".
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown.in does not regularly review posted Comments, but does reserve the right (but not the obligation)
              to monitor and edit or remove any Comments submitted to the Site. You grant HomeTown.in the right to use
              the name that you submit in connection with any Comments. You agree not to use a false email address,
              impersonate any person or entity, or otherwise mislead as to the origin of any Comments you submit. You
              are and shall remain solely responsible for the content of any Comments you make and you agree to
              indemnify HomeTown.in and its affiliates for all claims resulting from any Comments you submit.
              HomeTown.in and its affiliates take no responsibility and assume no liability for any Comments submitted
              by you or any third party.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Copyright & Trademark
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              HomeTown.in and its sellers, suppliers and licensors expressly reserve all intellectual property rights in
              all text, programs, products, processes, technology, content and other materials, which appear on this
              Site. Access to this Site does not confer and shall not be considered as conferring upon anyone any
              license under any of HomeTown.in or any third party's intellectual property rights. All rights, including
              copyright, in this website are owned by or licensed to HomeTown.in. Any use of this website or its
              contents, including copying or storing it or them in whole or part, other than for your own personal,
              non-commercial use is prohibited without the permission of HomeTown.in. You may not modify, distribute or
              re-post anything on this website for any purpose. The HomeTown.in names and s and all related product and
              service names, design marks and slogans are the trademarks or service marks of Praxis Home Retail Ltd. All
              other marks are the property of their respective companies. No trademark or service mark license is
              granted in connection with the materials contained on this Site. Access to this Site does not authorize
              anyone to use any name, logo or mark in any manner. References on this Site to any names, marks, products
              or services of third parties or hypertext links to third party sites or information are provided solely as
              a convenience to you and do not in any way constitute or imply HomeTown.in endorsement, sponsorship or
              recommendation of the third party, information, product or service. HomeTown.in is not responsible for the
              content of any third party sites and does not make any representations regarding the content or accuracy
              of material on such sites. If you decide to link to any such third party websites, you do so entirely at
              your own risk. All materials, including images, text, illustrations, designs, icons, photographs,
              programs, music clips or downloads, video clips and written and other materials that are part of this Site
              (collectively, the Contents) are intended solely for personal, non-commercial use. You may download or
              copy the Contents and other downloadable materials displayed on the Site for your personal use only. No
              right, title or interest in any downloaded materials or software is transferred to you as a result of any
              such downloading or copying. You may not reproduce (except as noted above), publish, transmit, distribute,
              display, modify, create derivative works from, sell or participate in any sale of or exploit in any way,
              in whole or in part, any of the Contents, the Site or any related software. All software used on this Site
              is the property of HomeTown.in or its suppliers and protected by Indian and international copyright laws.
              The Contents and software on this Site may be used only as a shopping resource. Any other use, including
              the reproduction, modification, distribution, transmission, republication, display, or performance, of the
              Contents on this Site is strictly prohibited. Unless otherwise noted, all Contents are copyrights,
              trademarks, trade dress and/or other intellectual property owned, controlled or licensed by HomeTown.in
              ,one of its affiliates or by third parties who have licensed their materials to HomeTown.in and are
              protected by Indian and international copyright laws. The compilation (meaning the collection,
              arrangement, and assembly) of all Contents on this Site is the exclusive property of HomeTown.in and is
              also protected by Indian and International copyright laws.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Objectionable Material
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              You understand that by using this Site or any services provided on the Site, you may encounter Content
              that may be deemed by some to be offensive, indecent, or objectionable, which Content may or may not be
              identified as such. You agree to use the Site and any service at your sole risk and that to the fullest
              extent permitted under applicable law, HomeTown.in and its affiliates shall have no liability to you for
              Content that may be deemed offensive, indecent, or objectionable to you.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Indemnity
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              You agree to defend, indemnify and hold harmless HomeTown.in, its employees, directors, officers, agents
              and their successors and assigns from and against any and all claims, liabilities, damages, losses, costs
              and expenses, including attorney's fees, caused by or arising out of claims based upon your actions or
              inactions, which may result in any loss or liability to HomeTown.in or any third party including but not
              limited to breach of any warranties, representations or undertakings or in relation to the non-fulfilment
              of any of your obligations under this User Agreement or arising out of your violation of any applicable
              laws, regulations including but not limited to Intellectual Property Rights, payment of statutory dues and
              taxes, claim of libel, defamation, violation of rights of privacy or publicity, loss of service by other
              subscribers and infringement of intellectual property or other rights. This clause shall survive the
              expiry or termination of this User Agreement.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Termination
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              This User Agreement is effective unless and until terminated by either you or HomeTown.in. You may
              terminate this User Agreement at any time, provided that you discontinue any further use of this Site.
              HomeTown.in may terminate this User Agreement at any time and may do so immediately without notice, and
              accordingly deny you access to the Site, Such termination will be without any liability to HomeTown.in.
              Upon any termination of the User Agreement by either you or HomeTown.in, you must promptly destroy all
              materials downloaded or otherwise obtained from this Site, as well as all copies of such materials,
              whether made under the User Agreement or otherwise. HomeTown.in's right to any Comments shall survive any
              termination of this User Agreement. Any such termination of the User Agreement shall not cancel your
              obligation to pay for the product already ordered from the Site or affect any liability that may have
              arisen under the User Agreement.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Limitation of Liability and Disclaimers
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              The Site is provided without any warranties or guarantees and in an "As Is" condition. You must bear the
              risks associated with the use of the Site.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              The Site provides content from other Internet sites or resources and while HomeTown.in tries to ensure
              that material included on the Site is correct, reputable and of high quality, it cannot accept
              responsibility if this is not the case. HomeTown.in will not be responsible for any errors or omissions or
              for the results obtained from the use of such information or for any technical problems you may experience
              with the Site.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              This disclaimer does not apply to any product warranty offered by the manufacturer of the product as
              specified in the product specifications. This disclaimer constitutes an essential part of this User
              Agreement.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              To the fullest extent permitted under applicable law, HomeTown.in or its suppliers shall not be liable for
              any indirect, incidental, special, incidental, consequential or exemplary damages, including but not
              limited to, damages for loss of profits, goodwill, use, data or other intangible losses arising out of or
              in connection with the Site, its services or this User Agreement.
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Without prejudice to the generality of the section above, the total liability of HomeTown.in to you for
              all liabilities arising out of this User Agreement be it in tort or contract is limited to the value of
              the product ordered by you. HomeTown.in, its associates and technology partners make no representations or
              warranties about the accuracy, reliability, completeness, correctness and/or timeliness of any content,
              information, software, text, graphics, links or communications provided on or through the use of the Site
              or that the operation of the Site will be error free and/or uninterrupted. Consequently, HomeTown.in
              assumes no liability whatsoever for any monetary or other damage suffered by you on account of the delay,
              failure, interruption, or corruption of any data or other information transmitted in connection with use
              of the Site; and/or any interruption or errors in the operation of the Site.
            </Text>
          </Div>
          <Div>
            <Heading fontFamily="medium" fontSize="1rem" color="text">
              Site Security
            </Heading>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              You are prohibited from violating or attempting to violate the security of the Site, including, without
              limitation, (a) accessing data not intended for you or logging onto a server or an account which you are
              not authorized to access; (b) attempting to probe, scan or test the vulnerability of a system or network
              or to breach security or authentication measures without proper authorization; (c) attempting to interfere
              with service to any other user, host or network, including, without limitation, via means of submitting a
              virus to the Site, overloading, "flooding," "spamming," "mailbombing" or "crashing;" (d) sending
              unsolicited email, including promotions and/or advertising of products or services; or (e) forging any
              TCP/IP packet header or any part of the header information in any email or newsgroup posting. Violations
              of system or network security may result in civil or criminal liability. HomeTown.in will investigate
              occurrences that may involve such violations and may involve, and cooperate with, law enforcement
              authorities in prosecuting users who are involved in such violations. You agree not to use any device,
              software or routine to interfere or attempt to interfere with the proper working of this Site or any
              activity being conducted on this Site. You agree, further, not to use or attempt to use any engine,
              software, tool, agent or other device or mechanism (including without limitation browsers, spiders,
              robots, avatars or intelligent agents) to navigate or search this Site other than the search engine and
              search agents available from HomeTown.in on this Site and other than generally available third party web
              browsers (e.g., Netscape Navigator, Microsoft Explorer).
            </Text>
            <Text color="rgba(0,0,0,0.7)" fontSize="0.875rem" mb="1rem">
              Entire Agreement If any part of this agreement is determined to be invalid or unenforceable pursuant to
              applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth
              above, then the invalid or unenforceable provision will be deemed to be superseded by a valid, enforceable
              provision that most closely matches the intent of the original provision and the remainder of the
              agreement shall continue to be in effect. Unless otherwise specified herein, this agreement constitutes
              the entire agreement between you and HomeTown.in with respect to the HomeTown.in sites/services and it
              supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written,
              between you and HomeTown.in with respect to the HomeTown.in sites/services. HomeTown.in failure to act
              with respect to a breach by you or others does not waive its right to act with respect to subsequent or
              similar breaches.
            </Text>
          </Div>
        </Row>
      </Div>
    </Container>
  </Section>
);

export default Terms;
