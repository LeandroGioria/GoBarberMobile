import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  const defaultDataProvider = {
    avatar: { url: 'https://api.adorable.io/avatar/50/notfound.png' },
    name: 'Não encontrado',
  };

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider
              ? data.provider.avatar
                ? data.provider.avatar.url
                : defaultDataProvider.avatar.url
              : defaultDataProvider.avatar.url,
          }}
        />

        <Info>
          <Name>
            {data.provider ? data.provider.name : defaultDataProvider.name}
          </Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      url: PropTypes.string,
    }),
    date: PropTypes.string,
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
    past: PropTypes.bool,
  }),
  onCancel: PropTypes.func.isRequired,
};

Appointment.defaultProps = {
  data: [],
};
