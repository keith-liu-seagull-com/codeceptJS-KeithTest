Feature: Driver Uninstall


  @BVT @Driverwizard @C79177
  Scenario: Successfully removal of a driver from the system using driver wizard

  Given The user has installed a driver on the system
  When the user proceeds with the installation
  And verify that the installer open the wizard

