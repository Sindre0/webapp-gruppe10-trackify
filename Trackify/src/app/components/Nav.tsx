import { Menu, User, Settings} from 'react-feather'

export default function Nav(){
    return(
    <nav>
        <p>Trackify</p>
        <ul>
            <li><a href="/menu"><Menu /></a></li>
            <li><a href="/user"><User /></a></li>
            <li><a href="/settings"><Settings /></a></li>
        </ul>
    </nav>
    )   
}