import React from 'react';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import MyMenu from 'newComponents/MyMenu';
import ProfileForm from 'newComponents/ProfileForm';
import UpdatePasswordForm from 'containers/UpdatePassword';
import MenuFooter from 'containers/MenuFooter';

const ProfileContainer = () => (
  <BoxHtV1>
    <MenuFooter pageTitle="My Profile">
      <MyMenu page="profile" />
      <ContainerHtV1 type="container" pr={0} pl={0}>
        <RowHtV1 display="block" mr={0} ml={0} padding="2rem 0">
          <BoxHtV1 col="6" paddingRight="3rem" width="49.8%">
            <ProfileForm />
          </BoxHtV1>
          <BoxHtV1 col="6" paddingLeft="3rem" width="49.8%">
            <UpdatePasswordForm />
          </BoxHtV1>
        </RowHtV1>
      </ContainerHtV1>
    </MenuFooter>
  </BoxHtV1>
);

export default ProfileContainer;
