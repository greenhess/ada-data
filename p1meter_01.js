
  document.getElementById('settings-toggle').addEventListener('click', () => {
    const settingsSubmenu = document.getElementById('settings-submenu');
    settingsSubmenu.style.display = settingsSubmenu.style.display === 'none' ? 'block' : 'none';
  });

  function navigateAndCloseMenu(pageId) {
    document.querySelectorAll('.content-page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelector('ion-menu').close();
  }
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  } else {
    document.body.setAttribute('data-theme', 'light');
  }

  const toggle = document.getElementById('themeToggle');
  toggle.checked = document.body.getAttribute('data-theme') === 'dark';

toggle.addEventListener('ionChange', (event) => {
  const newTheme = event.detail.checked ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateLogo();
});


  const translations = {
    en: {
        menuTitle: "Menu",
        profileName: "User Name",
        profileEmail: "user@email.com",
        menuHome: "Home",
        menuSettings: "Settings",
        menuProfile: "Profile",
        menuNotifications: "Notifications",
        menuAddDevice: "Add Device",
        menuSystem: "System",
        menuContact: "Contact",
        mainTitle: "ADA P1 Meter",
        mainLoader: "Loading",
        menuNetwork: "WiFi Network",
        menuFirmware: "Firmware update",
        lngTime: "Time",
        lngPhase1: "Phase 1 (V)",
        lngPhases: "Phases 1,2,3 (V)",
        lngCalculatedAmperage: "Calculated Amperage (A)",
        lngConsumption: "Consumption (kWh)",
        lngReturn: "Return (kWh)",
        lngConsRet: "Consumption, Return (kWh)",

        // Táblázat elemei
        lngBasicData: "Basic Data",
        lngMqttTopic: "Client Id",
        lngMeterSerialNumber: "Meter Serial Number",
        lngFirmwareVersion: "ADA Firmware Version",
        lngLogicalDeviceName: "Logical Device Identifier",
        lngTimestamp: "Timestamp",
        lngCircuitBreakerStatus: "Circuit Breaker Status",
        lngCurrentTariff: "Current Tariff Identifier",
        lngLimiterThreshold: "Limiter Threshold",
        lngFrequency: "Frequency",
        lngPowerFactor: "Power Factor",
        lngPhase12: "PHASE (1)",
        lngCurrentPhaseL1: "Current (Meter Reading)",
        lngCalculatedCurrentPhaseL1: "Calculated Current (Phase 1)",
        lngPowerFactorL1: "Power Factor (Phase 1)",
        lngVoltagePhaseL1: "Voltage (Phase 1)",
        lngCurrentLimitL1: "Current Limit (Phase 1)",
        lngPhase2: "PHASE (2)",
        lngCurrentPhaseL2: "Current (Meter Reading)",
        lngCalculatedCurrentPhaseL2: "Calculated Current (Phase 2)",
        lngPowerFactorL2: "Power Factor (Phase 2)",
        lngVoltagePhaseL2: "Voltage (Phase 2)",
        lngCurrentLimitL2: "Current Limit (Phase 2)",
        lngPhase3: "PHASE (3)",
        lngCurrentPhaseL3: "Current (Meter Reading)",
        lngCalculatedCurrentPhaseL3: "Calculated Current (Phase 3)",
        lngPowerFactorL3: "Power Factor (Phase 3)",
        lngVoltagePhaseL3: "Voltage (Phase 3)",
        lngCurrentLimitL3: "Current Limit (Phase 3)",
        lngConsumption2: "Consumption",
        lngInstantaneousPowerImport: "Instantaneous Power Import",
        lngTotalActiveEnergy: "Total Active Energy",
        lngActiveImportEnergyTotal: "Total Imported Active Energy",
        lngActiveImportEnergyTariff1: "Total Imported Energy (Tariff 1)",
        lngActiveImportEnergyTariff2: "Total Imported Energy (Tariff 2)",
        lngActiveImportEnergyTariff3: "Total Imported Energy (Tariff 3)",
        lngActiveImportEnergyTariff4: "Total Imported Energy (Tariff 4)",
        lngReturn2: "Return",
        lngInstantaneousPowerExport: "Instantaneous Power Export",
        lngActiveExportEnergyTotal: "Total Exported Active Energy",
        lngActiveExportEnergyTariff1: "Exported Energy (Tariff 1)",
        lngActiveExportEnergyTariff2: "Exported Energy (Tariff 2)",
        lngActiveExportEnergyTariff3: "Exported Energy (Tariff 3)",
        lngActiveExportEnergyTariff4: "Exported Energy (Tariff 4)",
        lngReactiveEnergy: "Reactive Energy",
        lngReactiveImportEnergy: "Total Reactive Energy",
        lngReactiveEnergyQ1: "Reactive Energy (Quarter I)",
        lngReactiveEnergyQ2: "Reactive Energy (Quarter II)",
        lngReactiveEnergyQ3: "Reactive Energy (Quarter III)",
        lngReactiveEnergyQ4: "Reactive Energy (Quarter IV)",
        lngInstantaneousReactivePowerQ1: "Instantaneous Reactive Power (Quarter I)",
        lngInstantaneousReactivePowerQ2: "Instantaneous Reactive Power (Quarter II)",
        lngInstantaneousReactivePowerQ3: "Instantaneous Reactive Power (Quarter III)",
        lngInstantaneousReactivePowerQ4: "Instantaneous Reactive Power (Quarter IV)",
        lngReactiveExportEnergy: "Total Exported Reactive Energy",
		lngieData: "<i>The displayed data reflects the values measured by the electricity meter. If discrepancies occur with other measurement methods or between the data displayed locally (localhost) and in the cloud (okosvillanyora.hu), this could be due to the measurement procedure or sampling time used by the meter manufacturer or developer. ADA12 cannot modify this. Based on our experience, some electricity meters only provide whole number current values for each phase. In such cases, the Calculated Amperage field helps refine the data: ADA12 calculates the relevant value based on the average current between phases and considering the phase voltages. <b>Please take this into account.</b></i>",
        lngfazis1: "Phase 1",
        lngfazis2: "Phase 2",
		lngfazis3: "Phase 3"
   },
    hu: {
        menuTitle: "Menü",
        profileName: "Felhasználó Neve",
        profileEmail: "felhasznalo@email.com",
        menuHome: "Főoldal",
        menuSettings: "Beállítások",
        menuProfile: "Profil",
        menuNotifications: "Értesítések",
        menuAddDevice: "Új eszköz",
        menuSystem: "Rendszer",
        menuContact: "Kapcsolat",
        mainTitle: "ADA P1 Meter",
        mainLoader: "Betöltés",
        menuNetwork: "WiFi hálózat",
        menuFirmware: "Firmware frissítés",
        lngTime: "Idő",
        lngPhase1: "Fázis 1 (V)",
        lngPhases: "Fázisok 1,2,3 (V)",
        lngCalculatedAmperage: "Kalkulált áramerősség (A)",
        lngConsumption: "Fogyasztás (kWh)",
        lngReturn: "Visszatáplálás (kWh)",
        lngConsRet: "Fogyasztás, visszatáplálás (kWh)",

        // Táblázat elemei
        lngBasicData: "Alapadatok",
        lngMqttTopic: "Azonosító",
        lngMeterSerialNumber: "A mérő sorozatszáma",
        lngFirmwareVersion: "ADA firmware verzió",
        lngLogicalDeviceName: "A logikai eszköz azonosító",
        lngTimestamp: "Az adatgyűjtés időbélyege",
        lngCircuitBreakerStatus: "A kismegszakító aktuális állapota",
        lngCurrentTariff: "Jelenlegi tarifa azonosítója",
        lngLimiterThreshold: "A maximális áramfelvétel korlátja",
        lngFrequency: "A rendszer frekvenciája",
        lngPowerFactor: "Az összesített teljesítménytényező",
        lngPhase12: "FÁZIS (1)",
        lngCurrentPhaseL1: "Áramerősség (mérőóra adat)",
        lngCalculatedCurrentPhaseL1: "Áramerősség (kalkulált adat, Fázis 1)",
        lngPowerFactorL1: "Teljesítménytényező (Fázis 1)",
        lngVoltagePhaseL1: "Feszültség (Fázis 1)",
        lngCurrentLimitL1: "Áramerősség korlátja (Fázis 1)",
        lngPhase2: "FÁZIS (2)",
        lngCurrentPhaseL2: "Áramerősség (mérőóra adat)",
        lngCalculatedCurrentPhaseL2: "Áramerősség (kalkulált adat, Fázis 2)",
        lngPowerFactorL2: "Teljesítménytényező (Fázis 2)",
        lngVoltagePhaseL2: "Feszültség (Fázis 2)",
        lngCurrentLimitL2: "Áramerősség korlátja (Fázis 2)",
        lngPhase3: "FÁZIS (3)",
        lngCurrentPhaseL3: "Áramerősség (mérőóra adat)",
        lngCalculatedCurrentPhaseL3: "Áramerősség (kalkulált adat, Fázis 3)",
        lngPowerFactorL3: "Teljesítménytényező (Fázis 3)",
        lngVoltagePhaseL3: "Feszültség (Fázis 3)",
        lngCurrentLimitL3: "Áramerősség korlátja (Fázis 3)",
        lngConsumption2: "Fogyasztás",
        lngInstantaneousPowerImport: "Jelenlegi áramfelvétel",
        lngTotalActiveEnergy: "Az összes energia",
        lngActiveImportEnergyTotal: "Az összes importált energia",
        lngActiveImportEnergyTariff1: "Az első tarifán mért összes energia",
        lngActiveImportEnergyTariff2: "A második tarifán mért összes energia",
        lngActiveImportEnergyTariff3: "A harmadik tarifán mért összes energia",
        lngActiveImportEnergyTariff4: "A negyedik tarifán mért összes energia",
        lngReturn2: "Visszatáplálás",
        lngInstantaneousPowerExport: "Jelenlegi exportált teljesítmény",
        lngActiveExportEnergyTotal: "Az összes exportált aktív energia",
        lngActiveExportEnergyTariff1: "Az első tarifán mért exportált energia",
        lngActiveExportEnergyTariff2: "A második tarifán mért exportált energia",
        lngActiveExportEnergyTariff3: "A harmadik tarifán mért exportált energia",
        lngActiveExportEnergyTariff4: "A negyedik tarifán mért exportált energia",
        lngReactiveEnergy: "Meddő energia",
        lngReactiveImportEnergy: "Az összes mért meddő energia",
        lngReactiveEnergyQ1: "Az első negyedévben mért meddő energia",
        lngReactiveEnergyQ2: "A második negyedévben mért meddő energia",
        lngReactiveEnergyQ3: "A harmadik negyedévben mért meddő energia",
        lngReactiveEnergyQ4: "A negyedik negyedévben mért meddő energia",
        lngInstantaneousReactivePowerQ1: "Meddő teljesítmény az első negyedévben",
        lngInstantaneousReactivePowerQ2: "Meddő teljesítmény a második negyedévben",
        lngInstantaneousReactivePowerQ3: "Meddő teljesítmény a harmadik negyedévben",
        lngInstantaneousReactivePowerQ4: "Meddő teljesítmény a negyedik negyedévben",
        lngReactiveExportEnergy: "Az összes exportált meddő energia",
		lngieData: "<i>A megjelenített adatok a villanyóra által mért értékeket tükrözik. Ha eltérés mutatkozik más mérési módszerekkel, illetve a helyi (localhost) és a felhőben (okosvillanyora.hu) megjelenített adatok között, ennek oka a villanyóra gyártója vagy fejlesztője által alkalmazott mérési eljárás vagy annak mintavételezési ideje lehet. Az ADA12 ezt nem tudja módosítani.  Tapasztalataink szerint bizonyos villanyórák csak egész számú áramerősség-értékeket adnak meg fázisonként. Ilyenkor az Áramerősség (kalkulált adat) mező segít pontosítani az adatokat: az ADA12 a fázisok közötti áramerősség átlagából és a fázisok feszültségének figyelembevételével számítja ki az ide vonatkozó értéket. <b>Kérjük, ezt vedd figyelembe.</b></i>",
        lngfazis1: "Fázis 1",
        lngfazis2: "Fázis 2",
		lngfazis3: "Fázis 3"
    }
};

  let loadingText = "";
  function changeLanguage(lang) {
    const texts = translations[lang];
// Tároljuk a nyelvet a localStorage-be
  localStorage.setItem('language', lang);
  
    // Menüpontok
    document.getElementById("menu-title").textContent = texts.menuTitle;
    document.getElementById("menu-home").textContent = texts.menuHome;
    document.getElementById("menu-settings").textContent = texts.menuSettings;
    document.getElementById("menu-add-device").textContent = texts.menuAddDevice;
    document.getElementById("menu-system").textContent = texts.menuSystem;
    document.getElementById("menu-contact").textContent = texts.menuContact;
    document.getElementById("main-title").textContent = texts.mainTitle;

    document.getElementById("menu-network").textContent = texts.menuNetwork;
    document.getElementById("menu-firmware").textContent = texts.menuFirmware;

    // Nyelvi szövegek a grafikonhoz
    document.getElementById("lngPhase1").textContent = texts.lngPhase1;
    document.getElementById("lngPhases").textContent = texts.lngPhases;
    document.getElementById("lngCalculatedAmperage").textContent = texts.lngCalculatedAmperage;
    document.getElementById("lngConsumption").textContent = texts.lngConsumption;
    document.getElementById("lngReturn").textContent = texts.lngReturn;
    document.getElementById("lngConsRet").textContent = texts.lngConsRet;

    // Táblázat elemei
    document.getElementById("lngBasicData").textContent = texts.lngBasicData;
    document.getElementById("lngMqttTopic").textContent = texts.lngMqttTopic;
    document.getElementById("lngMeterSerialNumber").textContent = texts.lngMeterSerialNumber;
    document.getElementById("lngFirmwareVersion").textContent = texts.lngFirmwareVersion;
    document.getElementById("lngLogicalDeviceName").textContent = texts.lngLogicalDeviceName;
    document.getElementById("lngTimestamp").textContent = texts.lngTimestamp;
    document.getElementById("lngCircuitBreakerStatus").textContent = texts.lngCircuitBreakerStatus;
    document.getElementById("lngCurrentTariff").textContent = texts.lngCurrentTariff;
    document.getElementById("lngLimiterThreshold").textContent = texts.lngLimiterThreshold;
    document.getElementById("lngFrequency").textContent = texts.lngFrequency;
    document.getElementById("lngPowerFactor").textContent = texts.lngPowerFactor;

    // Fázisok
    document.getElementById("lngPhase12").textContent = texts.lngPhase12;
    document.getElementById("lngCurrentPhaseL1").textContent = texts.lngCurrentPhaseL1;
    document.getElementById("lngCalculatedCurrentPhaseL1").textContent = texts.lngCalculatedCurrentPhaseL1;
    document.getElementById("lngPowerFactorL1").textContent = texts.lngPowerFactorL1;
    document.getElementById("lngVoltagePhaseL1").textContent = texts.lngVoltagePhaseL1;
    document.getElementById("lngCurrentLimitL1").textContent = texts.lngCurrentLimitL1;

    document.getElementById("lngPhase2").textContent = texts.lngPhase2;
    document.getElementById("lngCurrentPhaseL2").textContent = texts.lngCurrentPhaseL2;
    document.getElementById("lngCalculatedCurrentPhaseL2").textContent = texts.lngCalculatedCurrentPhaseL2;
    document.getElementById("lngPowerFactorL2").textContent = texts.lngPowerFactorL2;
    document.getElementById("lngVoltagePhaseL2").textContent = texts.lngVoltagePhaseL2;
    document.getElementById("lngCurrentLimitL2").textContent = texts.lngCurrentLimitL2;

    document.getElementById("lngPhase3").textContent = texts.lngPhase3;
    document.getElementById("lngCurrentPhaseL3").textContent = texts.lngCurrentPhaseL3;
    document.getElementById("lngCalculatedCurrentPhaseL3").textContent = texts.lngCalculatedCurrentPhaseL3;
    document.getElementById("lngPowerFactorL3").textContent = texts.lngPowerFactorL3;
    document.getElementById("lngVoltagePhaseL3").textContent = texts.lngVoltagePhaseL3;
    document.getElementById("lngCurrentLimitL3").textContent = texts.lngCurrentLimitL3;

    // Fogyasztás
    document.getElementById("lngConsumption2").textContent = texts.lngConsumption2;
    document.getElementById("lngInstantaneousPowerImport").textContent = texts.lngInstantaneousPowerImport;
    document.getElementById("lngTotalActiveEnergy").textContent = texts.lngTotalActiveEnergy;
    document.getElementById("lngActiveImportEnergyTotal").textContent = texts.lngActiveImportEnergyTotal;
    document.getElementById("lngActiveImportEnergyTariff1").textContent = texts.lngActiveImportEnergyTariff1;
    document.getElementById("lngActiveImportEnergyTariff2").textContent = texts.lngActiveImportEnergyTariff2;
    document.getElementById("lngActiveImportEnergyTariff3").textContent = texts.lngActiveImportEnergyTariff3;
    document.getElementById("lngActiveImportEnergyTariff4").textContent = texts.lngActiveImportEnergyTariff4;

    // Visszatáplálás
    document.getElementById("lngReturn2").textContent = texts.lngReturn2;
    document.getElementById("lngInstantaneousPowerExport").textContent = texts.lngInstantaneousPowerExport;
    document.getElementById("lngActiveExportEnergyTotal").textContent = texts.lngActiveExportEnergyTotal;
    document.getElementById("lngActiveExportEnergyTariff1").textContent = texts.lngActiveExportEnergyTariff1;
    document.getElementById("lngActiveExportEnergyTariff2").textContent = texts.lngActiveExportEnergyTariff2;
    document.getElementById("lngActiveExportEnergyTariff3").textContent = texts.lngActiveExportEnergyTariff3;
    document.getElementById("lngActiveExportEnergyTariff4").textContent = texts.lngActiveExportEnergyTariff4;

    // Meddő energia
    document.getElementById("lngReactiveEnergy").textContent = texts.lngReactiveEnergy;
    document.getElementById("lngReactiveImportEnergy").textContent = texts.lngReactiveImportEnergy;
    document.getElementById("lngReactiveEnergyQ1").textContent = texts.lngReactiveEnergyQ1;
    document.getElementById("lngReactiveEnergyQ2").textContent = texts.lngReactiveEnergyQ2;
    document.getElementById("lngReactiveEnergyQ3").textContent = texts.lngReactiveEnergyQ3;
    document.getElementById("lngReactiveEnergyQ4").textContent = texts.lngReactiveEnergyQ4;
    document.getElementById("lngInstantaneousReactivePowerQ1").textContent = texts.lngInstantaneousReactivePowerQ1;
    document.getElementById("lngInstantaneousReactivePowerQ2").textContent = texts.lngInstantaneousReactivePowerQ2;
    document.getElementById("lngInstantaneousReactivePowerQ3").textContent = texts.lngInstantaneousReactivePowerQ3;
    document.getElementById("lngInstantaneousReactivePowerQ4").textContent = texts.lngInstantaneousReactivePowerQ4;
    document.getElementById("lngReactiveExportEnergy").textContent = texts.lngReactiveExportEnergy;

    document.getElementById("lngieData").innerHTML = texts.lngieData;

// Chart frissítése az új fordításokkal
  const selectedType = document.getElementById('dataSelect').value;
  chart.data.datasets = getDatasetsByType(selectedType);
  chart.update();

  // Mentés a localStorage-be
  localStorage.setItem('language', lang);
  loadingText = texts.mainLoader;
  updateLogo();
}


function updateLogo() {
  const logo = document.getElementById("logo");
  const theme = document.body.getAttribute('data-theme');

  if (theme === 'dark') {
    logo.src = 'https://okosvillanyora.hu/app/images/ada_p1_meter_white_logo.png';  
  } else {
    logo.src = 'https://okosvillanyora.hu/app/images/ada_p1_meter_logo.png';  
  }
}
  const savedLanguage = localStorage.getItem('language') || 'en';
  changeLanguage(savedLanguage);
