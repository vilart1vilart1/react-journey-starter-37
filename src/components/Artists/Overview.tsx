import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from '@/lib/utils';
import { useArtist } from '@/hooks/use-artist';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area"

const Overview = () => {
  const { artist } = useArtist();

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium leading-none">Nom</p>
            <p className="text-sm text-muted-foreground">{artist?.nom}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Genre</p>
            <p className="text-sm text-muted-foreground">{artist?.genre || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Email</p>
            <p className="text-sm text-muted-foreground">{artist?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Téléphone</p>
            <p className="text-sm text-muted-foreground">{artist?.telephone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Adresse</p>
            <p className="text-sm text-muted-foreground">{artist?.adresse || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium leading-none">Événements passés</p>
            <p className="text-sm text-muted-foreground">{artist?.evenementsPassés}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Heures de répétition</p>
            <p className="text-sm text-muted-foreground">{artist?.rehearsalHours}</p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Revenu total</p>
            <p className="text-sm text-muted-foreground">{formatPrice(artist?.totalRevenue || 0)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[150px]">
            <p className="text-sm text-muted-foreground">{artist?.bio || 'Aucune bio disponible.'}</p>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          {artist?.social?.instagram && (
            <Badge variant="secondary">
              <a href={artist.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </Badge>
          )}
          {artist?.social?.facebook && (
            <Badge variant="secondary">
              <a href={artist.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Badge>
          )}
          {artist?.social?.twitter && (
            <Badge variant="secondary">
              <a href={artist.social.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </Badge>
          )}
          {(!artist?.social?.instagram && !artist?.social?.facebook && !artist?.social?.twitter) && (
            <p className="text-sm text-muted-foreground">Aucun lien social disponible.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
