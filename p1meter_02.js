 let v1 = 0;
 let v2 = 0;
 let v3 = 0;
 let valData = 0;
 let chart;
 let dataLoaded = false;
 const colors = {
 phase1: '#3f89d3',
 phase2: '#d7a65b',
 phase3: '#ff33a1',
 consumption: '#e1b351',
 return: '#3db373'
 };
 
 
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  
  const dataSelect = document.getElementById('dataSelect');
  if (dataSelect) {
    dataSelect.value = typeParam || 'phases';

   dataSelect.addEventListener('ionChange', (event) => {
      updateChartType(event.detail.value);
    });
  }
  fetchConfig();
  setupChart();
  fetchData();
  setInterval(fetchData, 5000);
});

 
 function setupChart() {
 const ctx = document.getElementById('chart').getContext('2d');
 chart = new Chart(ctx, {
 type: 'line',
 data: {
 labels: [],
 datasets: getDatasetsByType(document.getElementById('dataSelect').value)
 },
 options: {
 responsive: true,
 scales: {
 x: {
 type: 'time',
 time: {
 unit: 'minute',
 displayFormats: {
 minute: 'HH:mm', 
 hour: 'HH:mm'
 },
 tooltipFormat: 'HH:mm' 
 },
 title: {
 display: true,
 text: 'Idő'
 }
 },
 y: {
 title: {
 display: true,
 text: 'V'
 }
 }
 }
 }
 });
 }
function convertToTransparent(color, opacity) {
 if (color.startsWith('#')) {
 const r = parseInt(color.slice(1, 3), 16);
 const g = parseInt(color.slice(3, 5), 16);
 const b = parseInt(color.slice(5, 7), 16);
 return `rgba(${r}, ${g}, ${b}, ${opacity})`;
 }
 return color.replace(/rgba?\(([^)]+)\)/, `rgba($1, ${opacity})`);
}



function getDatasetsByType(type) {
  const lang = localStorage.getItem('language') || 'en';
  const texts = translations[lang];

  const datasets = {
    'phase1': [{ label: texts.lngfazis1, data: [], borderColor: colors.phase1, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase1, 0.3), fill: true }],
    'phases': [
      { label: texts.lngfazis1, data: [], borderColor: colors.phase1, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase1, 0.3), fill: true },
      { label: texts.lngfazis2, data: [], borderColor: colors.phase2, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase2, 0.3), fill: true },
      { label: texts.lngfazis3, data: [], borderColor: colors.phase3, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase3, 0.3), fill: true }
    ],
    'consumption': [{ label: texts.lngConsumption, data: [], borderColor: colors.consumption, borderWidth: 1, backgroundColor: convertToTransparent(colors.consumption, 0.3), fill: true }],
    'return': [{ label: texts.lngReturn, data: [], borderColor: colors.return, borderWidth: 1, backgroundColor: convertToTransparent(colors.return, 0.3), fill: true }],
    'consumption_return': [
      { label: texts.lngConsumption, data: [], borderColor: colors.consumption, borderWidth: 1, backgroundColor: convertToTransparent(colors.consumption, 0.3), fill: true },
      { label: texts.lngReturn, data: [], borderColor: colors.return, borderWidth: 1, backgroundColor: convertToTransparent(colors.return, 0.3), fill: true }
    ],
    'kcurrent': [
      { label: texts.lngfazis1, data: [], borderColor: colors.phase1, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase1, 0.3), fill: true },
      { label: texts.lngfazis2, data: [], borderColor: colors.phase2, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase2, 0.3), fill: true },
      { label: texts.lngfazis3, data: [], borderColor: colors.phase3, borderWidth: 1, backgroundColor: convertToTransparent(colors.phase3, 0.3), fill: true }
    ]
  };
  return datasets[type] || datasets['phases'];
}


 function updateChartType(selectedType) {
  selectedType = selectedType || document.getElementById('dataSelect').value;
  chart.data.datasets = getDatasetsByType(selectedType);
  chart.data.labels = [];
  chart.data.datasets.forEach(dataset => {
    dataset.data = [];
  });
  let yAxisLabel = '';
  if (selectedType === 'phase1' || selectedType === 'phases') {
    yAxisLabel = 'V';
  } else if (selectedType === 'consumption' || selectedType === 'consumption_return') {
    yAxisLabel = 'kWh';
  } else if (selectedType === 'return') {
    yAxisLabel = 'kWh';
  } else if (selectedType === 'kcurrent') { 
    yAxisLabel = 'A';
  }
  chart.options.scales.y.title.text = yAxisLabel;
  chart.update();
}

 
 
 function updateChart() {
 if (dataLoaded) return; 
 const now = new Date();
 const type = document.getElementById('dataSelect').value;
 if (type === 'phase1') {
 chart.data.labels.push(now);
 chart.data.datasets[0].data.push(v1);
 } else if (type === 'phases') {
 chart.data.labels.push(now);
 chart.data.datasets[0].data.push(v1);
 chart.data.datasets[1].data.push(v2);
 chart.data.datasets[2].data.push(v3);
 } else if (type === 'kcurrent') {
 chart.data.labels.push(now);
 chart.data.datasets[0].data.push(parseFloat(document.getElementById("current_phase_Bl1").textContent));
 chart.data.datasets[1].data.push(parseFloat(document.getElementById("current_phase_Bl2").textContent));
 chart.data.datasets[2].data.push(parseFloat(document.getElementById("current_phase_Bl3").textContent));
 } else if (type === 'consumption') {
 chart.data.labels.push(now);
 chart.data.datasets[0].data.push(parseFloat(document.getElementById("instantaneous_power_import").textContent));
 } else if (type === 'return') {
 chart.data.labels.push(now);
 chart.data.datasets[0].data.push(parseFloat(document.getElementById("instantaneous_power_export").textContent));
 } else if (type === 'consumption_return') {
 const consumptionData = parseFloat(document.getElementById("instantaneous_power_import").textContent);
 const returnData = parseFloat(document.getElementById("instantaneous_power_export").textContent);
 chart.data.labels.push(now);
 chart.data.datasets[0].data.push(consumptionData);
 chart.data.datasets[1].data.push(returnData);
 }
 if (chart.data.labels.length > 20) {
 chart.data.labels.shift();
 chart.data.datasets.forEach(ds => ds.data.shift());
 }
 chart.update();
 dataLoaded = true; 
}
 function updateFields(jsonData){document.getElementById("client_id").textContent=jsonData.client_id||"";
document.getElementById("meter_serial_number").textContent=jsonData.meter_serial_number||"";
document.getElementById("os_version").textContent=jsonData.os_version||"";
document.getElementById("cosem_logical_device_name").textContent=jsonData.cosem_logical_device_name||"";
document.getElementById("timestamp").textContent=jsonData.timestamp||"";

document.getElementById("profile-name").innerHTML = (jsonData.client_id || "").replace(/_/g, ":");
document.getElementById("profile-email").innerHTML = "<b>IP: </b>" +jsonData.local_ip||"";


document.getElementById("circuit_breaker_status").textContent=jsonData.circuit_breaker_status||"";
document.getElementById("current_tariff2").textContent=jsonData.current_tariff||"";
document.getElementById("limiter_threshold").textContent=jsonData.limiter_threshold||"";
document.getElementById("frequency").textContent=jsonData.frequency||"";
document.getElementById("power_factor").textContent=jsonData.power_factor||"";
document.getElementById("current_phase_l1").textContent=jsonData.current_phase_l1||"";
document.getElementById("current_phase_Bl1").textContent=jsonData.current_phase_Bl1||"";
document.getElementById("power_factor_l1").textContent=jsonData.power_factor_l1||"";
document.getElementById("voltage_phase_l1").textContent=jsonData.voltage_phase_l1||"";
document.getElementById("current_limit_l1").textContent=jsonData.current_limit_l1||"";
document.getElementById("current_phase_l2").textContent=jsonData.current_phase_l2||"";
document.getElementById("current_phase_Bl2").textContent=jsonData.current_phase_Bl2||"";
document.getElementById("power_factor_l2").textContent=jsonData.power_factor_l2||"";
document.getElementById("voltage_phase_l2").textContent=jsonData.voltage_phase_l2||"";
document.getElementById("current_limit_l2").textContent=jsonData.current_limit_l2||"";
document.getElementById("current_phase_l3").textContent=jsonData.current_phase_l3||"";
document.getElementById("current_phase_Bl3").textContent=jsonData.current_phase_Bl3||"";
document.getElementById("power_factor_l3").textContent=jsonData.power_factor_l3||"";
document.getElementById("voltage_phase_l3").textContent=jsonData.voltage_phase_l3||"";
document.getElementById("current_limit_l3").textContent=jsonData.current_limit_l3||"";
document.getElementById("instantaneous_power_import").textContent=jsonData.instantaneous_power_import||"";
document.getElementById("total_active_energy").textContent=jsonData.total_active_energy||"";
document.getElementById("active_import_energy_total").textContent=jsonData.active_import_energy_total||"";
document.getElementById("active_import_energy_tariff_1").textContent=jsonData.active_import_energy_tariff_1||"";
document.getElementById("active_import_energy_tariff_2").textContent=jsonData.active_import_energy_tariff_2||"";
document.getElementById("active_import_energy_tariff_3").textContent=jsonData.active_import_energy_tariff_3||"";
document.getElementById("active_import_energy_tariff_4").textContent=jsonData.active_import_energy_tariff_4||"";
document.getElementById("instantaneous_power_export").textContent=jsonData.instantaneous_power_export||"";
document.getElementById("active_export_energy_total").textContent=jsonData.active_export_energy_total||"";
document.getElementById("active_export_energy_tariff_1").textContent=jsonData.active_export_energy_tariff_1||"";
document.getElementById("active_export_energy_tariff_2").textContent=jsonData.active_export_energy_tariff_2||"";
document.getElementById("active_export_energy_tariff_3").textContent=jsonData.active_export_energy_tariff_3||"";
document.getElementById("active_export_energy_tariff_4").textContent=jsonData.active_export_energy_tariff_4||"";
document.getElementById("reactive_import_energy").textContent=jsonData.reactive_import_energy||"";
document.getElementById("reactive_export_energy").textContent=jsonData.reactive_export_energy||"";
document.getElementById("reactive_energy_qi").textContent=jsonData.reactive_energy_qi||"";
document.getElementById("reactive_energy_qii").textContent=jsonData.reactive_energy_qii||"";
document.getElementById("reactive_energy_qiii").textContent=jsonData.reactive_energy_qiii||"";
document.getElementById("reactive_energy_qiv").textContent=jsonData.reactive_energy_qiv||"";
document.getElementById("instantaneous_reactive_power_qi").textContent=jsonData.instantaneous_reactive_power_qi||"";
document.getElementById("instantaneous_reactive_power_qii").textContent=jsonData.instantaneous_reactive_power_qii||"";
document.getElementById("instantaneous_reactive_power_qiii").textContent=jsonData.instantaneous_reactive_power_qiii||"";
document.getElementById("instantaneous_reactive_power_qiv").textContent=jsonData.instantaneous_reactive_power_qiv||"";
v1 = parseFloat(jsonData.voltage_phase_l1); 
v2 = parseFloat(jsonData.voltage_phase_l2); 
v3 = parseFloat(jsonData.voltage_phase_l3); 
}

let firstDataLoaded = false; 

function fetchData() {
  if (!firstDataLoaded) {
    showLoading();
  }

  fetch('http://' + local_ip + ':8989/json')
    .then(response => response.json())
    .then(data => {
      updateFields(data);
      if (!firstDataLoaded) {
        hideLoading(); 
        firstDataLoaded = true; 
      }
      valData = 1;
      updateChart();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      if (!firstDataLoaded) {
        hideLoading(); 
      }
    });
  dataLoaded = false;
}


 fetchData();
 setInterval(fetchData, 5000);
 function checkForUpdate() {

 const versionUrl = "/check_version";

 fetch(versionUrl)
 .then(response => {
 if (!response.ok) {
 throw new Error("Nem sikerült lekérni a verziószámot.");
 }
 return response.text();
 })
 .then(latestVersion => {
 latestVersion = latestVersion.trim();
 if (latestVersion !== os_version) {
 if (confirm(`Elérhető egy új frissítés: ${latestVersion}. Szeretnéd újraindítani az ADA12-t a frissítéshez?`)) {
 restartESP(); 
 }
 } else {
 alert("Az aktuális verzió naprakész.");
 }
 })
 .catch(error => {
 console.error("Hiba a verzióellenőrzés során:", error);
 alert("Nem sikerült ellenőrizni a frissítést.");
 });
 }
 function restartESP() {
 fetch('http://' + local_ip+ ':8989/restart')
 .then(response => {
 if (response.ok) {
 alert("Az ADA12 újraindul.");
 } else {
 alert("Hiba történt az újraindítás során.");
 }
 })
 .catch(error => {
 console.error("Hiba:", error);
 alert("Nem sikerült kapcsolatba lépni az ESP32-vel.");
 });
 }
 
 
 
 let loading;

async function showLoading() {
  loading = await document.createElement('ion-loading');
  loading.message = loadingtext;
  document.body.appendChild(loading);
  await loading.present();
}

async function hideLoading() {
  if (loading) {
    await loading.dismiss();
  }
}


function fetchConfig() {
  const configUrl = `http://${local_ip}:8989/config`;
  console.log('Local IP:', local_ip);
  
  fetch(configUrl)
    .then(response => response.json())
    .then(data => {
      if (data.wifi_networks) {
        populateWifiNetworks(data.wifi_networks, data.ssid); 
      }

      document.getElementById('mqtt-broker').value = data.mqtt_server || '';
      document.getElementById('mqtt-port').value = data.mqtt_port || '';
      document.getElementById('mqtt-user').value = data.mqtt_user || '';
      document.getElementById('mqtt-password').value = data.mqtt_password || '';
      document.getElementById('wifi-password').value = data.password || '';
    })
    .catch(error => {
      console.error('Error fetching configuration:', error);
    });
}

function populateWifiNetworks(networks, selectedSsid) {
  const wifiSelect = document.getElementById('wifi-network-select');
  wifiSelect.innerHTML = ''; 

  networks.forEach(network => {
    const option = document.createElement('ion-select-option');
    option.value = network.ssid;
    option.textContent = network.ssid;
    wifiSelect.appendChild(option);
  });

  wifiSelect.value = selectedSsid;

  wifiSelect.dispatchEvent(new Event('ionChange'));
}

function saveNetworkSettings() {
  const ssid = document.getElementById("wifi-network-select").value;
  const wifiPassword = document.getElementById("wifi-password").value;
  const mqttServer = document.getElementById("mqtt-broker").value;
  const mqttPort = document.getElementById("mqtt-port").value;
  const mqttUser = document.getElementById("mqtt-user").value;
  const mqttPassword = document.getElementById("mqtt-password").value;


  const url = `http://${local_ip}:8989/submit_config`;

  const data = new URLSearchParams();
  data.append("wifinetwork", ssid);
  data.append("wifipassword", wifiPassword);
  data.append("server", mqttServer);
  data.append("port", mqttPort);
  data.append("user", mqttUser);
  data.append("password", mqttPassword);

  fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded" 
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("Settings saved successfully!");
      alert("Beállítások sikeresen mentve! Az ESP újraindul.");
    } else {
      console.error("Error saving settings.");
      alert("Hiba történt a beállítások mentésekor.");
    }
  })
  .catch(error => {
    console.error("Network error:", error);
    alert("Hálózati hiba történt a beállítások mentésekor.");
  });
}
