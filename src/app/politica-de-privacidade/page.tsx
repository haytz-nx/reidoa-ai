import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do Rei do Açaí.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold">Política de Privacidade</h1>
      <p className="mt-2 text-sm text-black/50 dark:text-white/50">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <div className="prose prose-sm mt-8 max-w-none space-y-5 text-black/70 dark:text-white/70">
        <p>
          O <strong>Rei do Açaí</strong> valoriza a privacidade dos seus
          clientes. Esta política explica quais informações coletamos, como
          usamos e como protegemos seus dados ao utilizar nosso site para
          realizar pedidos.
        </p>

        <h2 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-white">
          1. Informações que coletamos
        </h2>
        <p>
          Ao finalizar um pedido, coletamos informações como nome, telefone e
          endereço de entrega, utilizadas exclusivamente para processar seu
          pedido via WhatsApp. Também podemos armazenar localmente (no seu
          navegador) itens do carrinho, favoritos e histórico de produtos
          visualizados, por meio do LocalStorage.
        </p>

        <h2 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-white">
          2. Como usamos suas informações
        </h2>
        <p>
          As informações fornecidas no checkout são usadas apenas para gerar
          a mensagem do seu pedido, enviada por você via WhatsApp diretamente
          para o nosso número oficial. Não compartilhamos seus dados com
          terceiros para fins de marketing.
        </p>

        <h2 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-white">
          3. Armazenamento local
        </h2>
        <p>
          Utilizamos o LocalStorage do seu navegador para manter seu carrinho
          salvo entre visitas, lembrar seus produtos favoritos e preferências
          de tema (claro/escuro). Esses dados ficam apenas no seu dispositivo
          e podem ser apagados a qualquer momento limpando os dados do
          navegador.
        </p>

        <h2 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-white">
          4. Cookies
        </h2>
        <p>
          Utilizamos cookies estritamente necessários para o funcionamento do
          painel administrativo (autenticação). Não utilizamos cookies de
          rastreamento de terceiros.
        </p>

        <h2 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-white">
          5. Seus direitos
        </h2>
        <p>
          Você pode solicitar a exclusão de qualquer dado fornecido entrando
          em contato pelo nosso WhatsApp. Como não mantemos um banco de dados
          de clientes, a maior parte das informações some assim que o
          atendimento é concluído.
        </p>

        <h2 className="font-display text-xl font-bold text-[#1A1A1A] dark:text-white">
          6. Contato
        </h2>
        <p>
          Em caso de dúvidas sobre esta política, entre em contato pelo
          WhatsApp (15) 99745-1969 ou visite nossa loja física em Cerquilho -
          SP.
        </p>
      </div>
    </div>
  );
}
