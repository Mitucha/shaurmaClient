import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserCard } from './UserCard';
import { useEffect } from 'react';
import { all } from '../../../http/UserAPI';
import { useContext, useState } from 'react';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';

const UserPage = observer( () => {
  const { users } = useContext(Context)


  useEffect(() => {
    all().then(data => users.setUsers(data.data))
  }, [])
  return (
    <div className="container">
      {users.allUsers.map((item) => <UserCard key={item.id} info={item}/> )}
    </div>
  );
});

export { UserPage };
