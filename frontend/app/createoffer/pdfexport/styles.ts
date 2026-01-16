import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#111827',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
        marginTop: 2,
        letterSpacing: 1,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 20,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 9,
        color: '#6B7280',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
        color: '#1F2937',
    },
    itemValue: {
        fontSize: 10,
        marginBottom: 10,
        color: '#1F2937',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingVertical: 5,
        alignItems: 'center',
    },
    tableColMain: {
        flex: 3,
    },
    tableCol: {
        flex: 1,
        textAlign: 'right',
    }
});