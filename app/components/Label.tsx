import { Marker, Popup } from 'react-leaflet'

interface LabelProps {
    text: string;
    latlng: number[];
   }

const Label : React.FC<LabelProps> = ({ text, latlng}) => {
    return (
        <Marker position={[latlng[0],latlng[1]]}>
            <Popup>
                {text}
            </Popup>
        </Marker>
    )
}

export default Label