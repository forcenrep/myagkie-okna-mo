import {
  Factory,
  FileCheck2,
  MessageSquareText,
  Ruler,
  Wrench,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { processSteps } from "../data";
import { Reveal } from "./Reveal";

const stepIcons = [
  MessageSquareText,
  Ruler,
  FileCheck2,
  Factory,
  Wrench,
] as const;

const processListVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.38,
    },
  },
};

const processStepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Process() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 75%", "end 45%"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <Reveal className="section-heading split-heading">
          <div>
            <span className="section-kicker">От фотографии до готовой веранды</span>
            <h2>Понятный процесс. Зафиксированный результат.</h2>
          </div>
          <p>
            До начала работ вы знаете, что будет установлено, сколько это стоит
            и когда монтаж будет завершён.
          </p>
        </Reveal>

        <motion.div
          className="process-list"
          ref={processRef}
          variants={processListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          <motion.div
            className="process-progress"
            style={{ scaleX: progressScale }}
          />
          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.article
                className="process-step"
                key={step.number}
                variants={processStepVariants}
              >
                <div className="step-marker">
                  <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
                  <span className="step-number">{step.number}</span>
                </div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
