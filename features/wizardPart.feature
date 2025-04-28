Feature: Driver Uninstall


  @BVT @Driverwizard @C79177
  Scenario: Successfully removal of a driver from the system using driver wizard

  Given The user is installing some driver
  When the user proceeds with the wizard installation
  And verify that the wizard finish the installation

