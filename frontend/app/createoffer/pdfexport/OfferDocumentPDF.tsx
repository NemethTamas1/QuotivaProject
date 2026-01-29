import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from './styles';
import { CreateOfferForm } from '../types';
import { useAuth, User } from '@/context/AuthContext';
import { profileType } from '@/app/dashboard/types/types';

export const OfferPDFDocument = ({ data, profile, user }: { data: CreateOfferForm, profile: profileType | null, user: User | null }) => (


  <Document>
    <Page size="A4" style={styles.page}>
      {/* 1. Fejléc: Cégadatok és Vevő adatok egymás mellett */}
      <View style={[styles.header, styles.row]}>
        <View>
          <Text style={styles.title}>Quotiva</Text>
          <Text style={styles.subtitle}>ÁRAJÁNLAT</Text>
        </View>

        <View style={[styles.column, { textAlign: 'right' }]}>
          <Text style={styles.label}>AJÁNLAT RÉSZLETEI:</Text>
          <Text style={styles.value}>Dátum: {new Date().toLocaleDateString('hu-HU')}</Text>
          <Text style={styles.value}>Érvényesség: {data.dated} - {data.valid_until}</Text>
        </View>
      </View>

      {/* 2. Ajánlat neve és egyéb infók */}
      <View style={{ textAlign: 'center' }}>
        <Text style={[styles.value, { fontSize: 14, fontWeight: 'bold' }]}>{data.offer_name}</Text>
      </View>

      <View style={styles.detailsContainer}>

        <View style={styles.column}>
          <Text style={styles.label}>Ajánlattevő:</Text>
          <Text style={styles.value}>{profile?.company_name}</Text>
          <Text style={styles.value}>{profile?.company_email}</Text>
          <Text style={styles.value}>{user?.name}</Text>
          <Text style={styles.value}>{profile?.zip} {profile?.city}</Text>
          <Text style={styles.value}>{profile?.street} {profile?.house_number}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Vevő:</Text>
          <Text style={styles.value}>{data.client_name}</Text>
          <Text style={styles.value}>{data.client_email}</Text>
          <Text style={styles.value}>{data.client_zip} {data.client_city}</Text>
          <Text style={styles.value}>{data.client_street} {data.client_house_number}.</Text>
        </View>
      </View>

      {/* 3. Táblázat "Header" */}
      <View style={[styles.tableRow, { backgroundColor: '#f3f4f6' }]}>
        <View style={[styles.value, { flex: 2 }]}><Text>Megnevezés</Text></View>
        <View style={[styles.value, { flex: 1, textAlign: 'center' }]}><Text>Menny.</Text></View>
        <View style={[styles.value, { flex: 2, textAlign: 'right' }]}><Text>Munkadíj egységár</Text></View>
        <View style={[styles.value, { flex: 2, textAlign: 'right' }]}><Text>Anyag egységár</Text></View>
        <View style={[styles.value, { flex: 1, textAlign: 'right' }]}><Text>Összesen</Text></View>
      </View>

      {/* 4. Tételek listázása */}
      {data.items?.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={{ flex: 2 }}>
            <Text style={styles.itemValue}>{item.name}</Text>
          </View>
          <View style={{ flex: 1, textAlign: 'center' }}>
            <Text style={styles.itemValue}>{item.quantity}{item.quantity_type}</Text>
          </View>
          <View style={{ flex: 2, textAlign: 'right' }}>
            <Text style={styles.itemValue}>{Number(item.labor_unit_price).toLocaleString()} {data.currency}</Text>
          </View>
          <View style={{ flex: 2, textAlign: 'right' }}>
            <Text style={styles.itemValue}>{Number(item.material_unit_price).toLocaleString()} {data.currency}</Text>
          </View>
          <View style={{ flex: 1, textAlign: 'right' }}>
            <Text style={styles.itemValue}>{(item.quantity * item.material_unit_price).toLocaleString()} {data.currency}</Text>
          </View>
        </View>
      ))}

      {/* 5. Összesítés */}
      <View style={{marginTop: 30}}>
        <View>
          <Text style={styles.value}>Munkadíj összesen: {data.items?.reduce((sum, item) => sum + (item.quantity * item.labor_unit_price), 0).toLocaleString()} {data.currency}</Text>
        </View>

        <View>
          <Text style={styles.value}>Anyag összesen: {data.items?.reduce((sum, item) => sum + (item.quantity * item.material_unit_price), 0).toLocaleString()} {data.currency}</Text>
        </View>

        <View>
          <Text style={[styles.value, { fontSize: 14, fontWeight: 'bold' }]}>Mindösszesen: {data.items?.reduce((sum, item) => sum + ((item.quantity * item.material_unit_price + item.quantity * item.labor_unit_price)), 0).toLocaleString()} {data.currency}</Text>
        </View>
      </View>
    </Page>
  </Document>
);