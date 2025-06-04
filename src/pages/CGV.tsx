
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CGV = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-12">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Conditions générales de vente
          </h1>
          
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              CONDITIONS GÉNÉRALES DE VENTE – MYLITTLEHERO
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">Préambule</h3>
              <p className="leading-relaxed">
                Les présentes Conditions Générales de Vente (ci-après les « CGV ») régissent l'ensemble des ventes 
                conclues entre MyLittleHero, (ci-après « l'Éditeur » ou « nous »), et tout client (ci-après « le Client » 
                ou « vous ») passant commande de livres personnalisés pour enfants via le site internet mylittlehero.co 
                ou par tout autre moyen commercial.
              </p>
              <p className="leading-relaxed">
                En passant commande, le Client déclare avoir pris connaissance des présentes CGV et les accepter sans réserve.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">1. Objet</h3>
              <p className="leading-relaxed">
                Les présentes CGV ont pour objet de définir les modalités de commande, de paiement, de livraison et 
                d'exécution des ventes de livres personnalisés proposés par l'Éditeur. Chaque livre est personnalisé 
                selon les informations communiquées par le Client et validées par ce dernier avant production.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">2. Champ d'application</h3>
              <p className="leading-relaxed">
                Les CGV s'appliquent à toutes les ventes conclues avec le Client, que ce soit via le site mylittlehero.co 
                ou par tout autre moyen. Toute commande implique l'adhésion sans réserve du Client aux présentes CGV.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">3. Commande</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800">3.1. Processus de commande</h4>
                  <p className="leading-relaxed">
                    Le Client sélectionne le livre souhaité, procède à sa personnalisation via les outils mis à disposition 
                    sur mylittlehero.co et valide sa commande en confirmant l'exactitude des informations fournies.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">3.2. Validation</h4>
                  <p className="leading-relaxed">
                    La commande n'est considérée comme définitive qu'après validation par le Client et confirmation par 
                    l'Éditeur par courrier électronique. L'Éditeur se réserve le droit d'annuler toute commande en cas 
                    d'inexactitude des données fournies ou pour tout motif légitime.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">4. Prix</h3>
              <p className="leading-relaxed">
                Les prix des livres personnalisés sont indiqués en euros (€), toutes taxes comprises (TTC), et n'incluent 
                pas les frais d'expédition, sauf mention contraire. L'Éditeur se réserve le droit de modifier ses prix à 
                tout moment ; toutefois, les produits seront facturés sur la base des tarifs en vigueur au moment de la commande.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">5. Modalités de paiement</h3>
              <p className="leading-relaxed">
                Le règlement de la commande s'effectue en ligne par carte bancaire ou par tout autre moyen de paiement 
                sécurisé proposé sur mylittlehero.co. La commande sera traitée dès réception du paiement intégral. En cas 
                de refus ou d'annulation du paiement par l'établissement financier, la commande sera automatiquement annulée.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">6. Personnalisation et production</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800">6.1. Personnalisation</h4>
                  <p className="leading-relaxed">
                    Les informations fournies par le Client pour la personnalisation du livre sont de sa seule responsabilité. 
                    Il est recommandé de vérifier minutieusement ces informations avant validation définitive de la commande.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">6.2. Délai de production</h4>
                  <p className="leading-relaxed">
                    La production des livres personnalisés s'effectue dans un délai de 7 à 10 jours ouvrés après validation 
                    de la commande. Ce délai est donné à titre indicatif et ne saurait engager la responsabilité de l'Éditeur 
                    en cas de retard dû à des circonstances exceptionnelles.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">7. Livraison</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800">7.1. Modalités</h4>
                  <p className="leading-relaxed">
                    Les livres sont livrés à l'adresse indiquée par le Client lors de la commande. Les frais et délais de 
                    livraison seront précisés lors du processus de commande sur mylittlehero.co.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">7.2. Réception</h4>
                  <p className="leading-relaxed">
                    Le Client est tenu de vérifier la conformité de la livraison au moment de la réception. En cas de dommages 
                    apparents ou de non-conformité, le Client devra en informer l'Éditeur dans les plus brefs délais afin de 
                    convenir d'un échange ou d'un remboursement.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">8. Rétractation</h3>
              <p className="leading-relaxed">
                Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de 14 jours à compter de la 
                réception du produit pour exercer son droit de rétractation, sauf dans le cas où la personnalisation rendrait 
                le produit unique et non revendable. En cas d'exercice du droit de rétractation, le Client devra retourner le 
                livre dans son état d'origine et aux frais du Client, sauf accord contraire de l'Éditeur.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">9. Garantie et service après-vente</h3>
              <p className="leading-relaxed">
                Les produits fournis bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés. 
                Pour tout problème relatif à la conformité du produit ou pour toute réclamation, le Client est invité à contacter 
                le service client de l'Éditeur via contact@mylittlehero.fr ou par courrier recommandé.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">10. Propriété intellectuelle</h3>
              <p className="leading-relaxed">
                Tous les éléments de création, y compris les textes, illustrations et animations, sont la propriété exclusive 
                de l'Éditeur ou de ses partenaires et sont protégés par les lois en vigueur sur la propriété intellectuelle. 
                Toute reproduction, représentation ou utilisation, même partielle, est strictement interdite sans autorisation 
                préalable écrite.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">11. Responsabilité</h3>
              <p className="leading-relaxed">
                L'Éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de 
                l'impossibilité d'utiliser les produits commercialisés, sauf en cas de faute prouvée de sa part. La responsabilité 
                de l'Éditeur est limitée au montant de la commande ayant donné lieu au dommage.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">12. Données personnelles</h3>
              <p className="leading-relaxed">
                Les informations personnelles collectées lors de la commande sont utilisées exclusivement pour le traitement 
                de la commande et la gestion de la relation client. Conformément à la loi Informatique et Libertés du 6 janvier 
                1978 modifiée, le Client dispose d'un droit d'accès, de rectification et de suppression des données le concernant 
                en contactant le service client de l'Éditeur.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">13. Loi applicable et juridiction compétente</h3>
              <p className="leading-relaxed">
                Les présentes CGV sont régies par le droit français. En cas de litige, une solution amiable sera recherchée 
                avant toute action judiciaire. À défaut d'accord, le litige sera porté devant les tribunaux compétents du 
                ressort du siège social de l'Éditeur.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">14. Dispositions finales</h3>
              <p className="leading-relaxed">
                Les présentes CGV constituent l'intégralité de l'accord entre l'Éditeur et le Client. Toute modification ou 
                renonciation à l'un quelconque des termes des présentes CGV devra être formalisée par un avenant écrit signé 
                par les deux parties.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              Dernière mise à jour : Décembre 2024
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CGV;
