import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { pdfStyles as styles } from './styles';
import { CreateOfferForm } from '../types';
import { User } from '@/context/AuthContext';
import { profileType } from '@/app/dashboard/types/types';
import App from 'next/app';

Font.register({
  family: 'Roboto',
  fonts: [
    { 
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', 
      fontWeight: 'normal' 
    },
    { 
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', 
      fontWeight: 'bold' 
    }
  ]
});

const style = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 30
  },
  applyFont: {
    fontFamily: 'Roboto'
  }
});



export const OfferPDFDocument = ({ data, profile, user }: { data: CreateOfferForm, profile: profileType | null, user: User | null }) => (

  <Document>
    <Page size="A4" style={[styles.page,style.page]}>
      {/* 1. Fejléc: Cégadatok és Vevő adatok egymás mellett */}
      <View style={[styles.header, styles.row, style.applyFont]}>
        <View>
          <Text style={[styles.title, style.applyFont]}>Quotiva</Text>
          <Text style={[styles.subtitle, style.applyFont]}>ÁRAJÁNLAT</Text>
        </View>

        <View style={[styles.column, { textAlign: 'right' }]}>
          <Text style={[styles.label, style.applyFont]}>AJÁNLAT RÉSZLETEI:</Text>
          <Text style={[styles.label, style.applyFont]}>Dátum: {new Date().toLocaleDateString('hu-HU')}</Text>
          <Text style={[styles.label, style.applyFont]}>Érvényesség: {data.dated} - {data.valid_until}</Text>
        </View>
      </View>

      {/* 2. Ajánlat neve és egyéb infók */}
      <View style={{ textAlign: 'center' }}>
        <Text style={[styles.value, style.applyFont, { fontSize: 14, fontWeight: 'bold' }]}>{data.offer_name}</Text>
      </View>

      <View style={[styles.detailsContainer, style.applyFont]}>

        <View style={[styles.column, styles.alignCenter]}>
          <Text style={[style.applyFont, styles.semibold]}>Ajánlattevő:</Text>
          <Text style={[styles.label, style.applyFont]}>{profile?.company_name}</Text>
          <Text style={[styles.label, style.applyFont]}>{profile?.company_email}</Text>
          <Text style={[styles.label, style.applyFont]}>{user?.name}</Text>
          <Text style={[styles.label, style.applyFont]}>{profile?.zip} {profile?.city}</Text>
          <Text style={[styles.label, style.applyFont]}>{profile?.street} {profile?.house_number}</Text>
        </View>

        <View style={[styles.column, styles.alignCenter]}>
          <Text style={[style.applyFont, styles.semibold]}>Vevő:</Text>
          <Text style={[styles.label, style.applyFont]}>{data.client_name}</Text>
          <Text style={[styles.label, style.applyFont]}>{data.client_email}</Text>
          <Text style={[styles.label, style.applyFont]}>{data.client_zip} {data.client_city}</Text>
          <Text style={[styles.label, style.applyFont]}>{data.client_street} {data.client_house_number}.</Text>
        </View>
      </View>

      {/* 3. Táblázat "Header" */}
      <View style={[styles.tableRow, style.applyFont, { backgroundColor: '#f3f4f6' }]}>
        <View style={[styles.value, style.applyFont, { flex: 2 }]}><Text>Megnevezés</Text></View>
        <View style={[styles.value, style.applyFont, { flex: 1, textAlign: 'center' }]}><Text>Menny.</Text></View>
        <View style={[styles.value, style.applyFont, { flex: 2, textAlign: 'right' }]}><Text>Munkadíj egységár</Text></View>
        <View style={[styles.value, style.applyFont, { flex: 2, textAlign: 'right' }]}><Text>Anyag egységár</Text></View>
        <View style={[styles.value, style.applyFont, { flex: 1, textAlign: 'right' }]}><Text>Összesen</Text></View>
      </View>

      {/* 4. Tételek listázása */}
      {data.items?.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={{ flex: 2 }}>
            <Text style={[styles.itemValue, style.applyFont]}>{item.name}</Text>
          </View>
          <View style={{ flex: 1, textAlign: 'center' }}>
            <Text style={[styles.itemValue, style.applyFont]}>{item.quantity}{item.quantity_type}</Text>
          </View>
          <View style={{ flex: 2, textAlign: 'right' }}>
            <Text style={[styles.itemValue, style.applyFont]}>{Number(item.labor_unit_price).toLocaleString()} {data.currency}</Text>
          </View>
          <View style={{ flex: 2, textAlign: 'right' }}>
            <Text style={[styles.itemValue, style.applyFont]}>{Number(item.material_unit_price).toLocaleString()} {data.currency}</Text>
          </View>
          <View style={{ flex: 1, textAlign: 'right' }}>
            <Text style={[styles.itemValue, style.applyFont]}>{(item.quantity * item.material_unit_price).toLocaleString()} {data.currency}</Text>
          </View>
        </View>
      ))}

      {/* 5. Összesítés */}
      <View style={{ marginTop: 30 }}>

        <View>
          <Text style={[styles.value, style.applyFont]}>Munkadíj nettó összesen: {data.items?.reduce((sum, item) => sum + (item.quantity * item.labor_unit_price), 0).toLocaleString()} {data.currency}</Text>
        </View>

        <View>
          <Text style={[styles.value, style.applyFont]}>Anyag nettó összesen: {data.items?.reduce((sum, item) => sum + (item.quantity * item.material_unit_price), 0).toLocaleString()} {data.currency}</Text>
        </View>

        <View>
          {data.tax_percent === 27 ? (
            <Text style={[styles.value, style.applyFont]}>
              ÁFA összesen: {data.items?.reduce((sum, item) => {
                const lineTotal = (item.quantity * (item.labor_unit_price + item.material_unit_price)) * 0.27;
                return sum + lineTotal;
              }, 0).toLocaleString()} {data.currency}
            </Text>
          ) : (
            <Text style={[styles.value, style.applyFont]}>Alanyi adómentes: 0 {data.currency}</Text>
          )}
        </View>

        <View>
          <Text style={[styles.value, style.applyFont, { fontSize: 14, fontWeight: 'bold' }]}>
            Mindösszesen: {data.items?.reduce((sum, item) => {
              const subTotal = item.quantity * (item.material_unit_price + item.labor_unit_price);
              const vat = data.tax_percent === 27 ? subTotal * 0.27 : 0;
              return sum + subTotal + vat;
            }, 0).toLocaleString()} {data.currency}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);