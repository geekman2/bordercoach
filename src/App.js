import React, { useReducer, useState } from 'react';
import ReactDOM from 'react-dom';

import { Stat } from './components/inputs.js'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles/app.css'
import { Divider } from '@mui/material';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const defaultStats = {
  "damage": "10",
  "damageFlavorText": "1",
  "damageCharacterModifier": "1",
  "accuracy": "70",
  "accuracyFlavorText": "1",
  "accuracyCharacterModifier": "1",
  "fireRate": "5",
  "fireRateFlavorText": "1",
  "fireRateCharacterModifier": "1",
  "reloadTime": "0.5",
  "reloadTimeFlavorText": "1",
  "reloadTimeCharacterModifier": "1",
  "magazineSize": "10",
  "magazineSizeFlavorText": "1",
  "magazineSizeCharacterModifier": "1"
}

function calculatNetStat(base, flavorText, characterModifier) {
  const baseFloat = parseFloat(base)
  const flavorTextPercentage = parseFloat(flavorText) / 100
  const characterModifierPercentage = parseFloat(characterModifier) / 100

  const stat = baseFloat + baseFloat * flavorTextPercentage + baseFloat * characterModifierPercentage

  console.log(baseFloat, flavorTextPercentage, characterModifierPercentage, stat)

  const statRounded = Math.round(stat, 1)

  return statRounded
}

function theProductOf(a, b) {
  return a * b
}

function App() {

  const [formData, setFormData] = useReducer(formReducer, defaultStats);
  const [submitting, setSubmitting] = useState(false);

  const damage = calculatNetStat(formData.damage, formData.damageFlavorText, formData.damageCharacterModifier)
  const accuracy = calculatNetStat(formData.accuracy, formData.accuracyFlavorText, formData.accuracyCharacterModifier)
  const fireRate = calculatNetStat(formData.fireRate, formData.fireRateFlavorText, formData.fireRateCharacterModifier)
  const reloadTime = calculatNetStat(formData.reloadTime, formData.reloadTimeFlavorText, formData.reloadTimeCharacterModifier)
  const magazineSize = calculatNetStat(formData.magazineSize, formData.magazineSizeFlavorText, formData.magazineSizeCharacterModifier)

  const baseDamage = damage * fireRate
  const criticalDamage = baseDamage * 1.4
  const practicalDamage = baseDamage * (accuracy/100)

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      console.log(formData)
    }, 300);
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    })
  }

  return (
    <div className='container'>
      <div className='row'>

        <div className='column-1'>
          <table>
            <thead>
              <tr>
                <td>
                  Stat
                </td>
                <td>Base</td>
                <td >
                  <div>Flavor Text</div>
                  <Divider/>
                  <div>Character Modifier</div>
                </td>



              </tr>
            </thead>
            <tbody>

              <Stat name="damage" label="Damage" handleChange={handleChange} formData={formData} />
              <Stat name="accuracy" label="Accuracy" handleChange={handleChange} formData={formData} />
              <Stat name="fireRate" label="Fire Rate" handleChange={handleChange} formData={formData} />
              <Stat name="reloadTime" label="Reload Time" handleChange={handleChange} formData={formData} />
              <Stat name="magazineSize" label="Magazine Size" handleChange={handleChange} formData={formData} />


            </tbody>
          </table>


        </div>

        <div className='column-2'>
          <Typography variant="h3">
            Damage Per
          </Typography>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Second
              </Typography>
              <Typography variant="body2">
                Base <span class='stat-number'>{baseDamage}</span>
              </Typography>
              <Typography variant="body2">
                Critical <span class='stat-number'>{criticalDamage}</span>
              </Typography>
              <Typography variant="body2">
                Practical <span class='stat-number'>{practicalDamage}</span>
              </Typography>
            </CardContent>
          </Card>
          <Divider/>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Minute
              </Typography>
              <Typography variant="body2">
                Base <span class='stat-number'>{damage * fireRate *60}</span>
              </Typography>
              <Typography variant="body2">
                Critical <span class='stat-number'>{criticalDamage *60}</span>
              </Typography>
              <Typography variant="body2">
                Practical <span class='stat-number'>{practicalDamage *60}</span>
              </Typography>
            </CardContent>
          </Card>
          <Divider/>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Magazine
              </Typography>
              <Typography variant="body2">
                Base <span class='stat-number'>{damage * fireRate *magazineSize}</span>
              </Typography>
              <Typography variant="body2">
                Critical <span class='stat-number'>{criticalDamage *magazineSize}</span>
              </Typography>
              <Typography variant="body2">
                Practical <span class='stat-number'>{practicalDamage *magazineSize}</span>
              </Typography>
            </CardContent>
          </Card>


        </div>

      </div>

    </div>
  );
}

export default App;
