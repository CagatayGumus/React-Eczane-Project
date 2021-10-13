import React, { useEffect, useState } from "react";
import { Card, Container, Dropdown, Grid, GridColumn, Menu } from "semantic-ui-react";
import { getIl, getIlce, getEczane } from "./Service";

interface IIl {
    SehirAd: string;
    SehirSlug: string;
  }
  interface IIlce {
    ilceAd: string;
    ilceSlug: string;
  }
  
  export interface IDetail {
    EczaneAdi: string;
    Adresi: string;
    Semt: string;
    YolTarifi: string;
    Telefon: string;
    Telefon2: string;
    Sehir: string;
    ilce: string;
    latitude: number;
    longitude: number;
  }
  


export default function Home() {
const [sehir, setSehir] = useState<IIl[]>([])
const [ilce, setIlce] = useState<IIlce[]>([])
const [sehirSlag, setSehirSlag] = useState("")
const [eczane, setEczane] = useState<IDetail[]>([])
const [activeItem, setActiveItem] = useState("")


useEffect(() => {
  sehirler();
}, [])

function sehirler(){
    getIl().then(res=>{
        const arrIl:IIl[]=[]
        res.data.data.map((item:IIl)=>{
       
          return arrIl.push(item)
        })
        setSehir(arrIl)
    })
}
function sehirSec(selectedCityDropDown:string){
    sehir.map((item)=>{
        if (item.SehirAd===selectedCityDropDown) {
            setSehirSlag(item.SehirSlug)
            getIlce(item.SehirSlug).then(res=>{
                const arrCounty:IIlce[]=[]
                res.data.data.map((item:IIlce)=>{
                    return arrCounty.push(item)
                })
                setIlce(arrCounty)
                console.log('ilçe', res);
            })
            
            console.log(`slug`, item.SehirSlug)
        }
    })
}

function ılceSec(selectedCountyDropDown:string){
    ilce.map((item)=>{
        if (item.ilceAd===selectedCountyDropDown) {
            console.log(item.ilceSlug);
            getEczane(sehirSlag,item.ilceSlug).then(res=>{
                console.log(res);
                const arrPhar:IDetail[]=[]

                res.data.data.map((item:IDetail)=>{
                    return arrPhar.push(item)
                })
                setEczane(arrPhar)
            })
        }
    })

}


  const countryOptions = sehir.map((item,index)=>({
      key:index,
      text:item.SehirAd,
      value:item.SehirSlug
  }));
  const countyOptions=ilce.map((item,index)=>({
      key:index,
      text:item.ilceAd,
      value:item.ilceSlug
  }))

  return (
    <>
    <Container>
      <Menu>
      <Menu.Item
        name='editorials'
        active={activeItem === 'editorials'} 
        onClick= {(e) => setActiveItem('editorials')}
      >
        Anasayfa
      </Menu.Item>     
      </Menu>
      <h1 style={{justifyContent:"center",display:"flex"}}>Eczane Arama Sitemize Hoşgeldiniz...</h1>
        <Grid columns="2">
          <GridColumn>
            <Dropdown 
            onChange={(evt)=>{sehirSec(String(evt.currentTarget.children[0].textContent))}}
              placeholder="Şehir Seçiniz..."
              fluid
              search
              selection
              options={countryOptions}
            />
          </GridColumn>
          <GridColumn>
            <Dropdown
                onChange={(evt)=>{ılceSec(String(evt.currentTarget.children[0].textContent))}}
              placeholder="İlçe Seçiniz..."
              fluid
              search
              selection
              options={countyOptions}
            />
          </GridColumn>
        </Grid>
        <h2 style={{display:"flex", justifyContent:"center"}}>Aradığınız Eczaneler </h2>

        <Grid columns="4">
            {
                eczane && 
                eczane.map((item,index)=>{
                    return (
                        <GridColumn key={index}>
                        <Card>
                        <Card.Content header={item.EczaneAdi} />
                        <Card.Content description={item.Adresi} />
                        <Card.Content extra>
                         {item.Telefon}
                        </Card.Content>
                      </Card>
                      </GridColumn>
                    )
                })
            }
        </Grid>
      </Container>
    </>
  );
}
