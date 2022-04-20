const foods = ['Pisang Goreng@200', 'Biskuit', 'Bubur Ayam@300', 'Odading@60', 'Bakso@360', 'Tahu Goreng@20', 'Nasi Padang@190', 'Ayam Bakar', 'Tempe Goreng@20', 'Telur Rebus'];

function convertFood(foods) {
  let result = [];
  for (let i = 0; i < foods.length; i++) {
    let temp = [];
    let kata = '';

    for (let j = 0; j < foods[i].length; j++) {
      if (foods[i][j] === '@') {
        temp.push(kata);
        kata = '';
      } else {
        kata += foods[i][j];
      }
      if (j === foods[i].length - 1) {
        temp.push(kata);
      }
    }
    result.push(temp);
  }

  return result;
}
// console.log(convertFood(foods))

function filterFoods(foods) {
  let result = [];
  for (let i = 0; i < foods.length; i++) {
    let temp = [];
    if (foods[i].length === 2) {
      temp.push(foods[i][0]);
      temp.push(Number(foods[i][1]));
      result.push(temp);
    }
  }
  return result;
}

function statusFood(foods) {
  for (let i = 0; i < foods.length; i++) {
    if (foods[i][1] > 200) {
      foods[i].push('high');
    } else if (foods[i][1] >= 90 && foods[i][1] <= 200) {
      foods[i].push('medium');
    } else {
      foods[i].push('low');
    }
  }
  return foods;
}

function statisticFood(foods) {
  let result = {};
  for (let i = 0; i < foods.length; i++) {
    let statusFood = foods[i][2];
    if (!result[statusFood]) {
      result[statusFood] = 0;
    }
    result[statusFood]++;
  }

  return result;
}

function generateFoodCalorie(foods) {
  let converted = convertFood(foods);
  let filtered = filterFoods(converted);
  let currStatus = statusFood(filtered);
  let statistic = statusFood(currStatus);

  let result = {
    statistic: statistic,
    foods: [],
  };

  for (let i = 0; i < currStatus.length; i++) {
    let food = currStatus[i][0];
    let kaloriAll = currStatus[i][0];
    let status = currStatus[i][2];

    let temp = { name: food, totalCalorie: kaloriAll, status: status };
    result.foods.push(temp);
  }
  return result;
}

console.log(generateFoodCalorie(foods));
// /*
// {
//   statistic: { medium: 2, high: 2, low: 3 },
//   foods: [
//     { name: 'Pisang Goreng', totalCalorie: 200, status: 'medium' },
//     { name: 'Bubur Ayam', totalCalorie: 300, status: 'high' },
//     { name: 'Odading', totalCalorie: 60, status: 'low' },
//     { name: 'Bakso', totalCalorie: 360, status: 'high' },
//     { name: 'Tahu Goreng', totalCalorie: 20, status: 'low' },
//     { name: 'Nasi Padang', totalCalorie: 190, status: 'medium' },
//     { name: 'Tempe Goreng', totalCalorie: 20, status: 'low' }
//   ]
// }
// */

// Silahkan tulis kode kamu untuk Manipulasi DOM disini

// document.querySelector('#highCount').innerText += `${generateFoodCalorie(foods).statistic.high}`;
// document.querySelector('#mediumCount').innerText += `${generateFoodCalorie(foods).statistic.medium}`;
// document.querySelector('#lowCount').innerText += `${generateFoodCalorie(foods).statistic.low}`;

// RENDER DI BROWSER
// selectors
const menuList = document.querySelector('.food-list');

// ABAIKAN code dibawah ini
function render() {
  // get todo list
  let foodObject = generateFoodCalorie(foods);
  // put all task to html
  for (let i = 0; i < foodObject.foods.length; i++) {
    // create div
    const menu = document.createElement('div');
    menu.classList.add('food');
    // create list
    const newMenu = document.createElement('li');
    newMenu.innerText = `${foodObject.foods[i].name} -- ${foodObject.foods[i].totalCalorie}`;
    newMenu.classList.add('food-item');
    menu.appendChild(newMenu);

    // create completed button
    const infoButton = document.createElement('button');
    infoButton.innerHTML = foodObject.foods[i].status[0].toUpperCase() + foodObject.foods[i].status.substring(1);
    if (infoButton.innerHTML === 'High') {
      infoButton.classList.add('high-btn');
    } else if (infoButton.innerHTML === 'Medium') {
      infoButton.classList.add('medium-btn');
    } else {
      infoButton.classList.add('low-btn');
    }
    menu.appendChild(infoButton);
    menuList.appendChild(menu);
  }
}
render();

// Uncomment baris ini untuk melakukan testing
// Comment juga semua code yang berhubungan dengan DOM untuk menjalankan testing
module.exports = {
  convertFood,
  filterFoods,
  statusFood,
  statisticFood,
  generateFoodCalorie,
};
