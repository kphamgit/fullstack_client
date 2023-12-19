import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
//import DropdownMenu from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { Nav} from 'react-bootstrap';


export default function NavBarButton({title, subcategories}) {
  return (
    <DropdownButton  className="d-inline mx-2" id="dropdown-basic-button" title={title}>
      {subcategories.map(subcat => 
          <Dropdown.Item  as={Link} to={`/sub_categories/${subcat.id}`}  key={subcat.id}>
            {subcat.name}
          </Dropdown.Item>
      )}
    </DropdownButton>
  );
}