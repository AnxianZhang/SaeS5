using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Tilemaps;

public class Warrior : Player
{
    private const float ATTACK_RANGE_RADIUS = 3f;
    private const float DIAG_RANGE_RADIUS = .5f;

    [SerializeField] private Transform attaqueRange;
    [SerializeField] private LayerMask scallingLayer;
    [SerializeField] private LayerMask destructibleLayer;

    private bool isEnnemyInRange;
    private Collider2D ennemyCollider;
    private Collider2D boxCollider;


    public new void Start()
    {
        
        base.Start();
        setPlayerCompetenciesSkills();
        this.ennemyCollider = null;
        this.boxCollider = null;
    }

    private void setPlayerCompetenciesSkills(){
        base.maxLife = 100;
        base.defence = .10f;
        base.currentLife = base.maxLife;
        base.damageDeal = 20;
        base.cooldown = 2f;
        for(int i = 0; i < base.skills.damageDealLvl - 1; i++){
            base.damageDeal = (int)Math.Round(base.damageDeal * 1.10f);
        }
        for(int i = 0; i < base.skills.defenceLvl - 1; i++){
            base.defence += .02f;
        }
         for(int i = 0; i < base.skills.lifeLvl - 1; i++){
            base.maxLife = (int)Math.Round(base.maxLife * 1.10f);
            base.currentLife = (int)Math.Round(base.currentLife * 1.10f);
        }
        for(int i = 0; i < base.skills.moveSpeedLvl - 1; i++){
            base.boostSpeed(1.01f, '*');
        }
    }

    public new void Update()
    {
        base.playerActions();
    }

    protected override void doPlayerAttaque()
    {
        if (this.ennemyCollider != null){
            GameObject ennemy = this.ennemyCollider.gameObject;
            float res = ennemy.transform.position.y - transform.position.y;
            float resSprite = ennemy.transform.position.x - transform.position.x;
            bool tourner = resSprite < 0 && spriteRenderer.flipX || resSprite >= 0 && !spriteRenderer.flipX;
            
            if (Vector2.Distance(ennemy.transform.position, transform.position) <= ATTACK_RANGE_RADIUS && res < DIAG_RANGE_RADIUS && res > -DIAG_RANGE_RADIUS && tourner)
            {
                if(!gm.isHitSoundPlaying()){
                    gm.hitSoundPlay();
                }
                ennemy.GetComponent<Enemy>().Attack(base.damageDeal, transform.position);
                base.lastAttackedAt = Time.time;
                base.isHit = true;
            }
            
        }
        else if (boxCollider!=null)
        {

            GameObject box = this.boxCollider.gameObject;
            Debug.Log(box.CompareTag("DestructibleLayer"));

            if (box.CompareTag("DestructibleLayer"))
            {
                float resSprite = box.transform.position.x - transform.position.x;
                bool tourner = resSprite < 0 && spriteRenderer.flipX || resSprite >= 0 && !spriteRenderer.flipX;
                if (tourner)
                {
                    box.GetComponent<DestructibleLayer>().Attack(boxCollider, new Vector3(this.transform.position.x - 1f, this.transform.position.y - 1, this.transform.position.z));
                    Debug.Log("Warrior : doPlayerAttaque tourner : " + new Vector3(this.transform.position.x - 1f, this.transform.position.y - 1, this.transform.position.z));

                }
                else
                {
                    box.GetComponent<DestructibleLayer>().Attack(boxCollider, new Vector3(this.transform.position.x, this.transform.position.y - 1, this.transform.position.z));
                    Debug.Log("Warrior : doPlayerAttaque : " + new Vector3(this.transform.position.x, this.transform.position.y - 1, this.transform.position.z));

                }


            }
        }
    }

    private new void FixedUpdate()
    {
        base.FixedUpdate();

        // detect when an ennemy enter in the attack range of the warior
        this.ennemyCollider = Physics2D.OverlapCircle(this.attaqueRange.position, ATTACK_RANGE_RADIUS, this.scallingLayer);
        this.boxCollider = Physics2D.OverlapCircle(this.attaqueRange.position, 0.65f, this.destructibleLayer);

    }

    void OnCollisionEnter2D(Collision2D col)
    {
        base.isInWater(col);
        base.isPotion(col);
    }

    private new void OnDrawGizmos()
    {
        base.OnDrawGizmos();
        Gizmos.color = Color.red;
        Gizmos.DrawWireSphere(this.attaqueRange.position, ATTACK_RANGE_RADIUS);
    }
}