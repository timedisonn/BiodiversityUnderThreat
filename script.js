// to lock the page to the top when reloading

if (window.location.href.indexOf("#top") === -1) {
  window.location.href = window.location.href + "#top";
}
//first chart. its as usual like in class. some charts with shorter data, i did not use the
//unpack function. i just used the data directly.
const unpack = (data, key) => data.map(row => row[key]);
  Plotly.d3.csv("extinct.csv", extinct_data => {
    const years = unpack(extinct_data, 'year')
    const counts = unpack(extinct_data, 'count')
    const contd = unpack(extinct_data, 'contd')

    var traceext1 = {
      x: years,
      y: counts,
      mode: 'lines',
      type: 'scatter',
      name: 'Extinction events'
    };

    var traceext2 = {
      x: years,
      y: contd,
      mode: 'lines',
      type: 'scatter',
      name: 'Cumulative Extinctions'
    };
    var lineData = [traceext1, traceext2]
    var lineLayout = {
      showlegend: true,
      title: 'Australian animal extinction over time',
      xaxis: {
        title: 'Year'
      },
      yaxis: {
        title: 'Extinct and Cumulative Extinct'
      }
    };
    Plotly.newPlot('line-chart', lineData, lineLayout);
  });
//like this one, i used the data here by itself instead of unpacking it
  var barData = [
    {
      x: [120],
      y: ['Cats'],
      name: 'Cats',
      orientation: 'h',
      type: 'bar'
    },
    {
      x: [145],
      y: ['Pigs'],
      name: 'Pigs',
      orientation: 'h',
      type: 'bar'
    },
    {
      x: [320],
      y: ['Rabbits'],
      name: 'Rabbits',
      orientation: 'h',
      type: 'bar'
    }
  ];

  var barLayout = {
    title: 'Top 3 most threatening invasive species in Australia',
    showlegend: true,
    yaxis: { autorange: "reversed" }
  };

  Plotly.newPlot('bar-chart', barData, barLayout);
//this is the code for the checkbox. i got it from GPT 3.5 and modified it to suit my needs.
  var barCheckboxes = document.querySelectorAll('#second-part input[type="checkbox"]');
  barCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      var barName = this.value;
      var checked = this.checked;
      toggleBar(barName, checked);
    });
  });

  function toggleBar(barName, checked) {
    var index = barData.findIndex(item => item.name === barName);
    if (index !== -1) {
      Plotly.restyle('bar-chart', { visible: checked }, [index]);
    }
  }

  Plotly.d3.csv("latlong.csv", ltlg_data => {
      const stateau = unpack(ltlg_data, 'state')
      const lat = unpack(ltlg_data, 'latitude')
      const long = unpack(ltlg_data, 'longitude')
      const szmp = unpack(ltlg_data, 'Size')
  
  var mapdata = [{
      type: 'scattergeo',
      lat: lat,
      lon: long,
      text: stateau,
      marker: {
        size: szmp,
        color: [1, 2, 3, 4],
        colorscale: 'Viridis',
        sizemode: 'diameter',
        sizeref: 0.1,
      },
      visible: true,
    }];
    
    var maplayout = {
      title: 'Reliable data on bushfire spread in Australia, in million ha.',
      geo: {
        scope: 'australia',
        resolution: 50,
        projection: {
          type: 'mercator',
        },
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        countrycolor: 'rgb(255, 255, 255)',
        coastlinecolor: 'rgb(255, 255, 255)',
        lataxis: {
          range: [-44, -7],
          showgrid: true,
          gridwidth: 0.5,
          tickmode: 'linear',
          dtick: 10,
        },
        lonaxis: {
          range: [112, 155],
          showgrid: true,
          gridwidth: 0.5,
          tickmode: 'linear',
          dtick: 20,
        },
      },
    };
    
    Plotly.newPlot('bubble-map', mapdata, maplayout);
  });

Plotly.d3.csv("invspecies.csv", inv_data => {
    const type = unpack(inv_data, 'type')
    const aus = unpack(inv_data, 'Australia')
    const wrl = unpack(inv_data, 'World')
    
    var groupbar = [
    {
      x: type,
      y: aus,
      name: 'Australia',
      type: 'bar'
    },
    {
      x: type,
      y: wrl,
      name: 'World',
      type: 'bar'
    }
  ];
  
  var gblayout = {
    title: 'Threats to Biodiversity, Australia and Worldwide.',
    barmode: 'group'
  };
  
  Plotly.newPlot('grouped-bar-chart', groupbar, gblayout);
});

Plotly.d3.csv("forestcov.csv", for_data => {
  const type = unpack(for_data, 'type')
  const afr = unpack(for_data, 'aft')
  const bef = unpack(for_data, 'before')
  
  var stackedbar = [
  {
    x: type,
    y: afr,
    name: 'Current Cover',
    type: 'bar',
    marker: {
      color: 'green',
    }
  },
  {
    x: type,
    y: bef,
    name: 'Lost Cover',
    type: 'bar',
    marker: {
      color: 'red',
    },
  },
];
const stlayout = {
  title: 'Australian Forests Cover Change (1750 vs Now)',
  barmode: 'stack',
};

Plotly.newPlot('stacked-bar-chart', stackedbar, stlayout);
});
//like this one, i used the data here by itself instead of unpacking it

const ninthPieData = [{
  values: [85, 15],
  labels: ['Predicted target reached', 'Target missed'],
  type: 'pie'
}];

const ninthPieLayout = {
  title: 'Emission target prediction'
};

Plotly.newPlot('ninthPie', ninthPieData, ninthPieLayout);
//like this one, i used the data here by itself instead of unpacking it
const ninthBarData = [{
  x: ['Coal', 'Gas and Oil', 'Other non renewables'],
  y: [69, 45, 253],
  type: 'bar'
}];

const ninthBarLayout = {
  title: 'New non renewable resources projects'
};

Plotly.newPlot('ninthBar', ninthBarData, ninthBarLayout);
