import twisted_pairs_img from './resources/information/twisted_pairs.jpg';
import twisted_pairs_inside_img from './resources/information/twisted_pairs_inside.jpg';


const information = [
    {
        id: 3,
        name: "Rodzaje ekranowania",
        images: [twisted_pairs_img, twisted_pairs_inside_img],
        content: 
        "Przewody internetowe da się podzielić także pod względem ich ekranowania, czyli odporności na ewentualne zakłócenia. Takie problemy mogą wynikać np. z nagromadzenia innych kabli w pobliżu. Wtedy odpowiednie ekranowanie zapewni stabilne połączenie z siecią. Najbardziej wytrzymałe pod tym względem okazują się kable S/FTP i STP (Shielded Twisted Pair). Wykorzystuje się je głównie w przemyśle. Kable FTP (Foiled Twisted Pair), używane są natomiast np. w większych biurach, z kolei kable UTP, które zyskały miano najpopularniejszych z nich wszystkich, stosuje się w warunkach domowych. Charakteryzują je niskie koszty produkcji oraz łatwa dostępność.",
        type: 'information',
    },
]

export function getInformation(informationId) {
    return information.find(inf => inf.id === informationId);
}
