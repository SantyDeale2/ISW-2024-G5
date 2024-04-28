"use client";
import useHome from "@/components/hooks/useHome";

export default function Home() {
  const { system } = useHome();
  return (
    <div className="flex px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] items-center">
      <div className="flex justify-between gap-[10%]">
        <div className="flex flex-col gap-10 w-[45%] justify-center">
          <span className="font-bold text-5xl">
            ¡BIENVENIDO A NUESTRA PÁGINA WEB!
          </span>
          <span className="font-semibold max-w-[70%] text-lg">
            Somos una plataforma de envíos colaborativa que conecta a usuarios
            que necesitan enviar carga con transportistas dispuestos a llevarla.
            Ofrece una amplia cobertura y múltiples opciones de pago, con
            seguimiento en tiempo real y un sistema de calificación para
            garantizar la calidad del servicio
          </span>
        </div>
        <div className="w-[45%]">
          <img src={"/Landing-Image.png"} alt="" className="h-full" />
        </div>
      </div>
    </div>
  );
}
